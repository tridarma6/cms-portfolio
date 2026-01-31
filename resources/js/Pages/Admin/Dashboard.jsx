import React from 'react';
import AdminLayout from './Layout/AdminLayout';
import AnimatedBG from '../../Components/AnimatedBG';
import { Link } from '@inertiajs/react';

export default function Dashboard({ user, experiences = [], projects = [], skills = [] }) {
  return (
    <div className="relative min-h-[70vh]">
      <AnimatedBG className="absolute inset-0 opacity-20" />
      <div className="relative z-10 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
            <h2 className="text-2xl font-bold tracking-tight text-emerald mb-2">Welcome back, {user?.name}</h2>
            <p className="text-sm text-emerald/60">Overview and quick stats will appear here.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-white/3 rounded-lg border border-white/6">
                <div className="text-sm text-emerald/60">Projects</div>
                <div className="mt-2 text-xl font-semibold">{projects.length}</div>
              </div>
              <div className="p-4 bg-white/3 rounded-lg border border-white/6">
                <div className="text-sm text-emerald/60">Skills</div>
                <div className="mt-2 text-xl font-semibold">{skills.length}</div>
              </div>
              <div className="p-4 bg-white/3 rounded-lg border border-white/6">
                <div className="text-sm text-emerald/60">Experiences</div>
                <div className="mt-2 text-xl font-semibold">{experiences.length}</div>
              </div>
            </div>
            {experiences.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm text-emerald/70 mb-3">Recent Experiences</h3>
                <div className="space-y-3">
                  {experiences.slice(0,3).map((exp) => (
                    <div key={exp.id} className="p-4 bg-white/3 rounded-lg border border-white/6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-emerald">{exp.role} @ {exp.company}</div>
                        </div>
                        <a href={`/admin/experiences/${exp.id}`} className="text-emerald/80 hover:underline">View</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
            <h3 className="text-sm font-medium text-emerald/80">Quick Actions</h3>
            <div className="mt-3 space-y-3 flex flex-col">
              <Link href='/admin/dashboard' className="w-full px-3 py-2 bg-emerald text-black rounded-md font-medium shadow-sm hover:brightness-110 text-center">New Project</Link>
              <Link href='/admin/messages' className="w-full px-3 py-2 border border-white/6 rounded-md text-emerald/80 hover:bg-white/3 text-center">View Messages</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.layout = page => <AdminLayout children={page} user={page.props.user} />;
