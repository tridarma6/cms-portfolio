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

  const formatDate = (date) => {
    if (!date) return ''
    return date.split('T')[0]
  }

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <div className='flex flex-row justify-between'>
            <div>
              <h2 className=''>{experience.company} @{experience.role}</h2>  
              <p className="text-sm text-emerald/60">{formatDate(experience.start_date)} to {formatDate(experience.end_date) || 'Present'}</p>
            </div>
            <Link href='/admin/experiences' className="text-l font-bold text-emerald mb-4 border-2 border-emerald-500 py-2 px-3 rounded-lg">Back</Link>
          </div>
          <div className="mt-6 bg-white/3 rounded">{experience.description}</div>
        </div>
      </div>
    </div>
  );
}

Show.layout = page => <AdminLayout children={page} user={page.props.user} />;
