import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ messages }) {
  function del(id) {
    if (!confirm('Delete this message?')) return;
    Inertia.delete(`/admin/messages/${id}`);
  }

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-emerald">Messages</h2>
            <div className="text-sm text-emerald/60">{messages?.meta?.total ?? messages?.length ?? 0} messages</div>
          </div>

          <div className="divide-y divide-white/6 rounded-md overflow-hidden">
            {(messages?.data || []).map((m) => (
              <div key={m.id} className={`flex items-center justify-between px-4 py-3 hover:bg-white/2 ${m.is_read ? 'opacity-80' : 'bg-white/2'}`}>
                <div>
                  <div className="flex items-center gap-3">
                    <a href={`/admin/messages/${m.id}`} className="text-emerald font-medium">{m.subject || 'Message'}</a>
                    {!m.is_read && <span className="text-xs bg-emerald text-black px-2 py-1 rounded">new</span>}
                  </div>
                  <div className="text-sm text-emerald/60 mt-1">From: {m.name} — {m.email}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm text-emerald/60">{new Date(m.created_at).toLocaleString()}</div>
                  <button onClick={() => del(m.id)} className="px-3 py-2 border border-red-600 text-red-300 rounded-md">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* simple pagination controls if provided */}
          {messages?.meta && (
            <div className="mt-4 text-sm text-emerald/60 flex items-center justify-between">
              <div>Page {messages.meta.current_page} of {messages.meta.last_page}</div>
              <div className="space-x-2">
                {messages.links?.map((l, idx) => (
                  <a key={idx} href={l.url || '#'} className={`px-2 py-1 rounded ${l.active ? 'bg-emerald text-black' : 'text-emerald/60'}`} dangerouslySetInnerHTML={{ __html: l.label }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Index.layout = page => <AdminLayout children={page} user={page.props.user} />;
