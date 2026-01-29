import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

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
            <div className="text-2xl font-extrabold tracking-widest text-emerald">ECLIPSE</div>
            <div className="text-sm text-emerald/60 mt-1">Admin Portal</div>
          </div>

          <nav className="space-y-1 mt-6">
            <NavLink href="/admin/dashboard"> 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald/70" viewBox="0 0 20 20" fill="currentColor"><path d="M3 13h4V3H3v10zM13 3v10h4V3h-4zM3 17h4v-2H3v2zM13 15h4v-2h-4v2z" /></svg>
              Dashboard
            </NavLink>
            <NavLink href="/admin/projects">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald/70" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3h12v4H4V3zM4 9h12v8H4V9z"/></svg>
              Projects
            </NavLink>
            <NavLink href="/admin/experiences">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald/70" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3h12v14H4z"/></svg>
              Experiences
            </NavLink>
            <NavLink href="/admin/skills">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald/70" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11h16v2H2z"/></svg>
              Skills
            </NavLink>
            <NavLink href="/admin/messages">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald/70" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10l-4-2H4a2 2 0 01-2-2V5z"/></svg>
              Messages
            </NavLink>
            <NavLink href="/admin/settings">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald/70" viewBox="0 0 20 20" fill="currentColor"><path d="M11.3 1.046l.7 2.48a7.03 7.03 0 012.219.858l2.334-1.02L17.5 6.5l2.334 1.02-1.525 2.184a7.034 7.034 0 01.022 2.451L19.834 15 16 18.5l-2.48-.7a7.02 7.02 0 01-2.86.012L8.666 19 5 15.5l1.02-2.334a7.034 7.034 0 01-.858-2.219L1.046 8.7 3.526 7.3l.7-2.48A7.02 7.02 0 015.238 2.51L7.5 1 11.3 1.046z"/></svg>
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
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold tracking-wide">Dashboard</h1>
              <div className="hidden sm:block text-sm text-emerald/60">Welcome back{user?.name ? `, ${user.name}` : ''}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-white/3 border border-white/6 rounded-lg px-3 py-2 backdrop-blur text-emerald/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-emerald/60" viewBox="0 0 20 20" fill="currentColor"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 14s1-1 6-1 6 1 6 1v2H2v-2z"/></svg>
                <input placeholder="Search" className="bg-transparent outline-none placeholder-emerald/50 text-emerald text-sm w-40" />
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg bg-white/6 hover:bg-white/8 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald/80" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a2 2 0 00-2 2v2a2 2 0 002 2 2 2 0 002-2V4a2 2 0 00-2-2zM4 10a2 2 0 012-2h8a2 2 0 012 2v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z"/></svg>
                </button>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald/20 border border-emerald/30 flex items-center justify-center text-sm">{user?.name?.[0] ?? 'A'}</div>
                </div>
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
