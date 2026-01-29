import React from 'react';
import { Instagram, Linkedin, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-emerald/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-8">
          {/* Left Column - Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-emerald tracking-wider font-raluweh">Surya's Portfolio</h3>
            <p className="text-emerald/70 leading-relaxed">
              Senior Illustrator and Graphic Designer based in Indonesia, specializing in UX Illustration, surrealism, and post-modern art approach. 
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald">Quick Links</h4>
            <nav className="space-y-2">
              <a href="/" className="block text-emerald/70 hover:text-emerald transition-colors duration-300 hover:translate-x-1 transform">
                Home
              </a>
              <a href="/projects" className="block text-emerald/70 hover:text-emerald transition-colors duration-300 hover:translate-x-1 transform">
                Portfolio
              </a>
              <a href="/about" className="block text-emerald/70 hover:text-emerald transition-colors duration-300 hover:translate-x-1 transform">
                About
              </a>
              <a href="/contact" className="block text-emerald/70 hover:text-emerald transition-colors duration-300 hover:translate-x-1 transform">
                Contact
              </a>
            </nav>
          </div>

          {/* Right Column - Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/drmwnsurya"
                className="p-2 text-emerald/60 hover:text-emerald hover:bg-emerald/10 rounded-lg transition-all duration-300 hover:scale-110 transform"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/drmwnsurya"
                className="p-2 text-emerald/60 hover:text-emerald hover:bg-emerald/10 rounded-lg transition-all duration-300 hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://darmawansurya.com"
                className="p-2 text-emerald/60 hover:text-emerald hover:bg-emerald/10 rounded-lg transition-all duration-300 hover:scale-110 transform"
                aria-label="Website"
              >
                <Globe size={20} />
              </a>
              <a
                href="mailto:drmwnsurya@gmail.com"
                className="p-2 text-emerald/60 hover:text-emerald hover:bg-emerald/10 rounded-lg transition-all duration-300 hover:scale-110 transform"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-emerald/20 mb-6"></div>

        {/* Copyright */}
        <div className="text-center text-emerald/50 text-sm">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}