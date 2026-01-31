import React from 'react';
import AdminLayout from './Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function Experiences({ user, experiences }) {
  function destroy(id) {
    if (!confirm('Delete this experience?')) return;
    Inertia.delete(`/admin/experiences/${id}`);
    window.location.reload();
  }

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-emerald">Experiences</h2>
          <Link href="/admin/experiences/create" className="px-3 py-2 bg-emerald text-black rounded-md">New Experience</Link>
        </div>

        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-4 text-emerald-50 shadow-lg">
          {(!experiences || experiences.data.length === 0) ? (
            <div className="text-emerald/70 p-6">No experiences yet.</div>
          ) : (
            <div className="space-y-3">
              {experiences.data.map((exp) => (
                <div key={exp.id} className="p-4 bg-white/3 rounded-lg border border-white/6 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-emerald">{exp.role} @ {exp.company}</div>
                  </div>
                  <div className="space-x-2">
                    <Link href={`/admin/experiences/${exp.id}`} className="text-emerald/80 hover:underline">View</Link>
                    <Link href={`/admin/experiences/${exp.id}/edit`} className="text-emerald/80 hover:underline">Edit</Link>
                    <button onClick={() => destroy(exp.id)} className="text-red-400 hover:underline">Delete</button>
                  </div>
                </div>
              ))}

              <div className="mt-4 flex items-center gap-2">
                {experiences.links && experiences.links.map((link, idx) => (
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

Experiences.layout = page => <AdminLayout children={page} user={page.props.user} />;
