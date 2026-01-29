import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';

export default function Show({ skill }) {
  function del() {
    if (!confirm('Delete this skill?')) return;
    Inertia.delete(`/admin/skills/${skill.id}`);
    window.location.href = '/admin/skills';
  }

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-emerald">{skill.name}</h2>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm text-emerald/70">Category:</span>
                <span className="text-sm bg-emerald/10 text-emerald px-2 py-1 rounded-md">{skill.category || 'General'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a href={`/admin/skills/${skill.id}/edit`} className="px-3 py-2 bg-emerald text-black rounded-md font-medium">Edit</a>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-emerald/80">Proficiency</div>
              <div className="text-sm text-emerald/70">{skill.proficiency ?? 0}%</div>
            </div>

            <div className="w-full bg-white/6 rounded-full h-3 overflow-hidden">
              <div className="bg-emerald h-3" style={{ width: `${skill.proficiency ?? 0}%` }} />
            </div>
          </div>

          <div className="mt-6 text-sm text-emerald/60">
            <div>Order: {skill.order ?? '-'}</div>
            {skill.created_at && <div className="mt-1">Created: {new Date(skill.created_at).toLocaleString()}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

Show.layout = page => <AdminLayout children={page} user={page.props.user} />;
