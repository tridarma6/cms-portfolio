import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { LayoutDashboardIcon, FileImage, BadgeCheck, Star, MessageCircleMore, Settings, UserStar } from 'lucide-react';

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-4 py-2 text-sm text-emerald/80 hover:text-emerald hover:bg-white/3 rounded-lg transition"
  >
    {children}
  </Link>
);

export default function AdminLayout({ children, user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-emerald-50 antialiased">
      <div className="relative min-h-screen">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block fixed left-8 top-12 bottom-12 w-72 p-6 rounded-2xl bg-white/4 backdrop-blur-md border border-white/6 shadow-lg">
          <div className="mb-6">
            <div className="text-2xl font-extrabold tracking-widest text-emerald">DASHBOARD</div>
            <div className="text-sm text-emerald/60 mt-1">Admin Portal</div>
          </div>

          <nav className="space-y-1 mt-6">
            <NavLink href="/admin/dashboard"> 
              <LayoutDashboardIcon className="h-5 w-5 text-emerald/70" />
              Dashboard
            </NavLink>
            <NavLink href="/admin/projects">
              <FileImage className='h-5 w-5 text-emerald/70'/>
              Projects
            </NavLink>
            <NavLink href="/admin/experiences">
              <BadgeCheck className="h-5 w-5 text-emerald/70" />
              Experiences
            </NavLink>
            <NavLink href="/admin/skills">
              <Star className="h-5 w-5 text-emerald/70" />
              Skills
            </NavLink>
            <NavLink href="/admin/messages">
              <MessageCircleMore className="h-5 w-5 text-emerald/70" />
              Messages
            </NavLink>
            <NavLink href="/admin/settings">
              <Settings className="h-5 w-5 text-emerald/70" />
              Settings
            </NavLink>
          </nav>

          <div className="mt-auto pt-6">
            <div className="text-sm text-emerald/60">Signed in as</div>
            <div className="mt-2 text-sm font-medium">{user?.name}</div>
          </div>
        </aside>

        {/* Mobile topbar */}
        <div className="md:hidden fixed top-4 left-4 z-40">
          <button onClick={() => setOpen(true)} className="p-2 rounded-lg bg-white/6 backdrop-blur text-emerald hover:scale-105 transition">
            ☰
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="w-72 p-6 rounded-r-2xl bg-white/4 backdrop-blur-md border-r border-white/6 shadow-lg">
              <div className="mb-6">
                <div className="text-lg font-extrabold text-emerald">ECLIPSE</div>
                <div className="text-sm text-emerald/60 mt-1">Admin</div>
              </div>
              <nav className="space-y-1">
                <NavLink href="/admin/dashboard">Dashboard</NavLink>
                <NavLink href="/admin/projects">Projects</NavLink>
                <NavLink href="/admin/experiences">Experiences</NavLink>
                <NavLink href="/admin/skills">Skills</NavLink>
                <NavLink href="/admin/messages">Messages</NavLink>
                <NavLink href="/admin/settings">Settings</NavLink>
              </nav>
              <div className="mt-6">
                <button onClick={() => setOpen(false)} className="text-sm text-emerald/60">Close</button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setOpen(false)} />
          </div>
        )}

        {/* Main content area */}
        <div className="md:pl-96 md:pr-12 p-6 min-h-screen">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-emerald">Admin Portal</h1>
            <div className="flex items-center gap-4">
            
              <div className="flex items-center gap-3">
                <a href='/admin/profile/edit' className="p-2 rounded-lg bg-white/6 hover:bg-white/8 transition">
                  <UserStar className='h-5 w-5 text-emerald/70'/>
                </a>
              </div>
            </div>
          </header>

          <main className="">
            <div className="space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
