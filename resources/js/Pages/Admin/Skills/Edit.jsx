import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function Edit({ skill }) {
  const form = useForm({ name: skill.name || '', proficiency: skill.proficiency || 0, category: skill.category || '', order: skill.order || 0 });

  function submit(e) {
    e.preventDefault();
    form.put(`/admin/skills/${skill.id}`);
  }

  const inputClass = 'w-full bg-transparent border border-white/6 rounded-md px-3 py-2 text-emerald placeholder-emerald/50';
  const labelClass = 'text-sm text-emerald/70 mb-1';

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <h2 className="text-2xl font-bold text-emerald mb-4">Edit Skill</h2>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <div className={labelClass}>Name</div>
              <input value={form.data.name} onChange={e => form.setData('name', e.target.value)} placeholder="Name" className={inputClass} />
            </div>

            <div>
              <div className={labelClass}>Proficiency (0-100)</div>
              <input type="number" min="0" max="100" value={form.data.proficiency} onChange={e => form.setData('proficiency', e.target.value)} placeholder="Proficiency (0-100)" className={inputClass} />
            </div>

            <div>
              <div className={labelClass}>Category</div>
              <input value={form.data.category} onChange={e => form.setData('category', e.target.value)} placeholder="Category" className={inputClass} />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button type="button" onClick={() => form.reset()} className="px-3 py-2 border border-white/6 rounded-md text-emerald/80">Reset</button>
              <button type="submit" className="px-4 py-2 bg-emerald text-black rounded-md font-medium">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Edit.layout = page => <AdminLayout children={page} user={page.props.user} />;
