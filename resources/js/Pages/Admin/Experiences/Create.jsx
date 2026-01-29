import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function Create() {
  const form = useForm({ company: '', role: '', description: '', start_date: '', end_date: '', is_current: false, order: 0 });

  function submit(e) {
    e.preventDefault();
    form.post('/admin/experiences');
  }

  const inputClass = 'w-full bg-transparent border border-white/6 rounded-md px-3 py-2 text-emerald placeholder-emerald/50';
  const labelClass = 'text-sm text-emerald/70 mb-1';

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <h2 className="text-2xl font-bold text-emerald mb-4">Create Experience</h2>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <div className={labelClass}>Company</div>
              <input value={form.data.company} onChange={e => form.setData('company', e.target.value)} placeholder="Company" className={inputClass} />
            </div>

            <div>
              <div className={labelClass}>Role</div>
              <input value={form.data.role} onChange={e => form.setData('role', e.target.value)} placeholder="Role" className={inputClass} />
            </div>

            <div>
              <div className={labelClass}>Description</div>
              <textarea value={form.data.description} onChange={e => form.setData('description', e.target.value)} placeholder="Description" className={`${inputClass} h-28`} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className={labelClass}>Start Date</div>
                <input type="date" value={form.data.start_date} onChange={e => form.setData('start_date', e.target.value)} className={inputClass} />
              </div>
              <div>
                <div className={labelClass}>End Date</div>
                <input type="date" value={form.data.end_date} onChange={e => form.setData('end_date', e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 text-emerald/80">
                <input type="checkbox" checked={form.data.is_current} onChange={e => form.setData('is_current', e.target.checked)} className="accent-emerald" />
                <span>Current</span>
              </label>

              <div className="flex items-center gap-3">
                <button type="submit" className="px-4 py-2 bg-emerald text-black rounded-md font-medium">Create</button>
                <button type="button" onClick={() => form.reset()} className="px-3 py-2 border border-white/6 rounded-md text-emerald/80">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Create.layout = page => <AdminLayout children={page} user={page.props.user} />;
