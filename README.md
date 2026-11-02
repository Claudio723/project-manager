# Project Manager

Minimalist, Apple-like project management app for small agencies.

## Stack

- Next.js 16 (App Router)
- Supabase (Auth, Postgres, Realtime, Storage)
- Tailwind CSS
- TypeScript

## Local Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor
3. Copy `.env.example` to `.env.local` and fill in your keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

## Features (V1)

- Dashboard with project overview
- Projects with Kanban + List views
- Tasks (status, priority, assignee, deadline)
- Comments + simple file uploads
- Light roles (Owner/Admin/Member) via RLS
- Live updates on board and comments (Supabase Realtime)

## Next Steps

- Push to a new GitHub repository
- Deploy to Vercel (connect the repo, add the same env vars)
- Expand RLS policies and add the remaining screens (project detail, task detail, team management)

## Design Spec

See `docs/superpowers/specs/2026-11-02-project-management-app-design.md` for the full approved design.
