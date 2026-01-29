import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { showConfirm } from '../../../utils/sweetalert';

export default function Show({ experience }) {
  async function del() {
    const result = await showConfirm('Delete Experience', 'Are you sure you want to delete this experience?', 'Delete', 'Cancel');
    if (result.isConfirmed) {
      Inertia.delete(`/admin/experiences/${experience.id}`);
      window.location.href = '/admin/experiences';
    }
  }

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <h2 className=''>{experience.company} @{experience.role}</h2>  
          <p className="text-sm text-emerald/60">{experience.start_date} - {experience.end_date || 'Present'}</p>
        </div>
      </div>
      <div className="mt-6 p-6 bg-white/3 rounded">{experience.description}</div>
    </div>
  );
}

Show.layout = page => <AdminLayout children={page} user={page.props.user} />;
