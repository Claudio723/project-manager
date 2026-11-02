-- Project Management App Schema
-- Run this in Supabase SQL Editor

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text check (role in ('owner', 'admin', 'member')) default 'member',
  avatar_url text,
  created_at timestamptz default now()
);

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status text check (status in ('active', 'archived')) default 'active',
  owner_id uuid references public.profiles(id) not null,
  created_at timestamptz default now()
);

-- Project members
create table if not exists public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text check (role in ('owner', 'admin', 'member')) default 'member',
  unique(project_id, user_id)
);

-- Tasks
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text check (status in ('todo', 'in_progress', 'done')) default 'todo',
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  assignee_id uuid references public.profiles(id),
  deadline date,
  project_id uuid references public.projects(id) on delete cascade not null,
  created_at timestamptz default now()
);

-- Comments
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  author_id uuid references public.profiles(id) not null,
  task_id uuid references public.tasks(id) on delete cascade not null,
  created_at timestamptz default now()
);

-- Attachments (metadata; files in Storage)
create table if not exists public.attachments (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  storage_path text not null,
  task_id uuid references public.tasks(id) on delete cascade not null,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.tasks enable row level security;
alter table public.comments enable row level security;
alter table public.attachments enable row level security;

-- Basic policies (refine as needed)
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Members can view projects they belong to" on public.projects for select using (
  exists (select 1 from public.project_members where project_id = id and user_id = auth.uid())
);

create policy "Owner/Admin can manage projects" on public.projects for all using (
  exists (select 1 from public.project_members where project_id = id and user_id = auth.uid() and role in ('owner', 'admin'))
);

-- Similar policies for other tables... (expand in production)
