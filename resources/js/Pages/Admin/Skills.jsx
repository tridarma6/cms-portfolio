import React from 'react';
import AdminLayout from './Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function Skills({ user, skills }) {
  function destroy(id) {
    if (!confirm('Delete this skill?')) return;
    Inertia.delete(`/admin/skills/${id}`);
    window.location.reload()
  }

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-emerald">Skills</h2>
          <Link href="/admin/skills/create" className="px-3 py-2 bg-emerald text-black rounded-md">New Skill</Link>
        </div>

        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-4 text-emerald-50 shadow-lg">
          {(!skills || skills.data.length === 0) ? (
            <div className="text-emerald/70 p-6">No skills yet.</div>
          ) : (
            <div className="space-y-3">
              {skills.data.map((s) => (
                <div key={s.id} className="p-3 bg-white/3 rounded-lg border border-white/6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-emerald">{s.name}</div>
                      <div className="text-xs text-emerald/60">Category: {s.category || 'General'}</div>
                    </div>
                    <div className="space-x-2">
                      <Link href={`/admin/skills/${s.id}`} className="text-emerald/80 hover:underline">View</Link>
                      <Link href={`/admin/skills/${s.id}/edit`} className="text-emerald/80 hover:underline">Edit</Link>
                      <button onClick={() => destroy(s.id)} className="text-red-400 hover:underline">Delete</button>
                    </div>
                  </div>

                  <div className="mt-1">
                    <div className="text-xs text-emerald/60 mb-1">Proficiency: {s.proficiency ?? 'N/A'}%</div>
                    <div className="w-full h-2 bg-white/6 rounded overflow-hidden">
                      <div className="h-2 bg-emerald" style={{ width: `${s.proficiency ?? 0}%` }} />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 flex items-center gap-2">
                {skills.links && skills.links.map((link, idx) => (
                  link.url ? (
                    <Link key={idx} href={link.url} className={`px-3 py-1 rounded ${link.active ? 'bg-emerald text-black' : 'bg-white/3 text-emerald/80'}`}>
                      <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    </Link>
                  ) : (
                    <span key={idx} className="px-3 py-1 rounded bg-white/6 text-emerald/60" dangerouslySetInnerHTML={{ __html: link.label }} />
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Skills.layout = page => <AdminLayout children={page} user={page.props.user} />;
