import React from 'react';
import AdminLayout from './Layout/AdminLayout';

export default function Settings({ settings = [] }) {
  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-emerald">Settings</h2>
            <div className="text-sm text-emerald/60">{settings.length} items</div>
          </div>

          <div className="divide-y divide-white/6 rounded-md overflow-hidden">
            {settings.map((s) => (
              <div key={s.id} className="flex items-center justify-between px-4 py-3 bg-transparent hover:bg-white/2">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-emerald/60">{s.key}</div>
                    {s.autoload ? (<span className="text-xs bg-emerald/10 text-emerald px-2 py-1 rounded">autoload</span>) : null}
                  </div>
                  <div className="text-sm text-emerald/50 mt-1 max-w-2xl truncate">{typeof s.value === 'string' && s.value.length > 120 ? s.value.slice(0, 120) + '…' : (s.value ?? '')}</div>
                </div>

                <div className="flex items-center gap-3">
                  <a href={`/admin/settings/${s.id}/edit`} className="px-3 py-2 bg-emerald text-black rounded-md font-medium">Edit</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Settings.layout = page => <AdminLayout children={page} user={page.props.user} />;
