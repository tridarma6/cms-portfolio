import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function Show({ project, primaryImage }) {
  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-emerald">{project.title}</h2>
              <p className="text-sm text-emerald/70 mt-1">{project.project_type}</p>
              <p className="text-sm text-emerald/70 mt-1">{project.position}</p>
              <p className="text-sm text-emerald/70 mt-1">{project.description}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/admin/projects/${project.id}/edit`} className="px-3 py-1 bg-white/3 rounded text-emerald/80">Edit</Link>
              <Link href="/admin/projects" className="px-3 py-1 bg-white/3 rounded text-emerald/80">Back</Link>
            </div>
          </div>
          <div className="mt-4 text-sm text-emerald/60">
            {primaryImage && 
            <img src={`/storage/${primaryImage.filename}`} alt="" />
            }
            {project.project_url && (<div>Project: <a href={project.project_url} className="text-emerald/80 hover:underline" target="_blank" rel="noreferrer">{project.project_url}</a></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

Show.layout = page => <AdminLayout children={page} user={page.props.user} />;
