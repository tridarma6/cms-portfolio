import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';

export default function Show({ message }) {
  function del() {
    if (!confirm('Delete this message?')) return;
    Inertia.delete(`/admin/messages/${message.id}`);
    window.location.href = '/admin/messages';
  }

  return (
    <div className="relative min-h-[60vh]">
      <a href="/admin/messages" className=" top-4 left-4 text-emerald hover:text-emerald/80 transition-colors">← Back to Messages</a>
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-emerald">{message.subject || 'Message'}</h2>
              <div className="mt-2 text-sm text-emerald/70">From: <span className="font-medium text-emerald/50">{message.name}</span> — <span className="text-emerald/50">{message.email}</span></div>
              {message.created_at && <div className="text-xs text-emerald/50 mt-1">{new Date(message.created_at).toLocaleString()}</div>}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={del} className="px-3 py-2 border border-red-600 text-red-300 rounded-md">Delete</button>
            </div>
          </div>

          <div className="mt-6 bg-white/6 border border-white/6 p-4 rounded-lg text-emerald-50">
            <pre className="whitespace-pre-wrap break-words text-emerald/80">{message.body}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

Show.layout = page => <AdminLayout children={page} user={page.props.user} />;
