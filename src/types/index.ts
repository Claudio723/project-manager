export type Role = "owner" | "admin" | "member";

export type TaskStatus = "todo" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  avatar_url: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  status: "active" | "archived";
  owner_id: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  assignee_id: string | null;
  deadline: string | null;
  project_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  content: string;
  author_id: string;
  task_id: string;
  created_at: string;
}
