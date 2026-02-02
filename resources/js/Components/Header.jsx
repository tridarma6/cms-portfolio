import React from 'react';

export default function Header({ currentPage = 'home', site_title }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/30 backdrop-blur-sm border-b border-black/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-boldjakarta font-extrabold text-emerald text-xl tracking-widest">{site_title || 'Portfolio'}</div>
        <nav className="flex items-center gap-4">
          <a href="/" className={`text-emerald/70 hover:text-white transition ${currentPage === 'home' ? 'text-white' : ''} glow-hover`}>Home</a>
          <a href="/experiences" className={`text-emerald/70 hover:text-white transition ${currentPage === 'experiences' ? 'text-white' : ''} glow-hover`}>Experience</a>
          <a href="/projects" className={`text-emerald/70 hover:text-white transition ${currentPage === 'projects' ? 'text-white' : ''} glow-hover`}>Projects</a>
          <a href="/about" className={`text-emerald/70 hover:text-white transition ${currentPage === 'about' ? 'text-white' : ''} glow-hover`}>About</a>
          <a href="/contact" className={`ml-2 px-3 py-1 rounded-lg bg-emerald/10 border border-emerald/20 text-emerald font-semibold hover:translate-y-[-2px] transition ${currentPage === 'contact' ? 'bg-emerald/20' : ''}`}>Contact</a>
        </nav>
      </div>
    </header>
  );
}