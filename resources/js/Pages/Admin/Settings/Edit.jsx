import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function Edit({ setting }) {
  const form = useForm({ value: setting.value || '', autoload: setting.autoload ? 1 : 0 });

  function submit(e) {
    e.preventDefault();
    form.put(`/admin/settings/${setting.id}`);
  }

  const inputClass = 'w-full bg-transparent border border-white/6 rounded-md px-3 py-2 text-emerald placeholder-emerald/50 resize-y';
  const labelClass = 'text-sm text-emerald/70 mb-1';

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <h2 className="text-2xl font-bold text-emerald mb-4">Edit Setting</h2>
          <div className="mb-4 text-sm text-emerald/70">Key: <span className="font-mono text-emerald/60">{setting.key}</span></div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <div className={labelClass}>Value</div>
              <textarea value={form.data.value} onChange={e => form.setData('value', e.target.value)} className={inputClass} rows={6} />
            </div>

            <div>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!form.data.autoload} onChange={e => form.setData('autoload', e.target.checked ? 1 : 0)} className="accent-emerald w-4 h-4" />
                <span className="text-emerald/70">Autoload (share to frontend)</span>
              </label>
              <div className="text-xs text-emerald/50 mt-1">When enabled, this setting will be automatically loaded and shared with the frontend.</div>
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
