import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Placeholder data – replace with real queries later
  const projects = [
    { id: "1", name: "Website Redesign", progress: 65 },
    { id: "2", name: "Mobile App", progress: 30 },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Dashboard</h2>
          <button className="px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800">
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow transition"
            >
              <h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
              <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">{p.progress}% complete</p>
            </Link>
          ))}
        </div>

        <section className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">My open tasks</h3>
          <div className="bg-white rounded-2xl p-6 text-sm text-gray-500">
            No open tasks yet.
          </div>
        </section>
      </main>
    </div>
  );
}
