import React from 'react';
import { Head } from '@inertiajs/react';
import { User, Briefcase, FileText, ExternalLink } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function About({ profile, settings, skills }) {
  if (!profile) {
    return (
      <>
        <Head title="About - Eclipse Studio" />
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-emerald-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-emerald mb-4">Profile not found</h1>
            <p className="text-emerald/60">Please set up your profile in the admin panel.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head title={`About ${profile.name} - Eclipse Studio`} />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-emerald-50">
        <Header currentPage="about" site_title={settings.site_title || 'Eclipse Studio'} />

        <main className="pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-raluweh">About Me</h1>
              <p className="text-emerald/60 text-lg">
                Crafting visual stories through abstract art and surrealist design
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Image & Basic Info */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 rounded-2xl p-6 text-center">
                  {profile.avatar ? (
                    <img
                      src={`/storage/${profile.avatar}`}
                      alt={profile.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-emerald/30"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-emerald/20 flex items-center justify-center">
                      <User size={48} className="text-emerald" />
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-white mb-2">{profile.name}</h2>

                  {profile.social_links && profile.social_links.length > 0 && (
                    <div className="flex justify-center gap-3">
                      {profile.social_links.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald/10 rounded-lg hover:bg-emerald/20 transition-colors"
                        >
                          <ExternalLink size={18} className="text-emerald" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 rounded-2xl p-6 mt-5">
                  <h2 className="text-xl font-semibold text-center mb-5 text-white">
                    My Skills
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-emerald/20 rounded-xl p-4"
                      >
                        {/* title row */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm font-medium">
                            {skill.name}
                          </span>
                        </div>

                        {/* progress bar */}
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              </div>

              {/* Bio & Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio */}
                <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="text-emerald" size={24} />
                    <h3 className="text-xl font-bold text-white">Biography</h3>
                  </div>
                  <p className="text-emerald/80 leading-relaxed">
                    {profile.bio || 'No biography available yet. Please update your profile in the admin panel.'}
                  </p>
                </div>

                {/* What I Do */}
                <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="text-emerald" size={24} />
                    <h3 className="text-xl font-bold text-white">What I Do</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/20 rounded-lg p-4 border border-emerald/10">
                      <h4 className="font-semibold text-emerald mb-2">Digital Illustration</h4>
                      <p className="text-emerald/70 text-sm">
                        Creating expressive and imaginative illustrations for brands, stories, and visual campaigns
                      </p>
                    </div>

                    <div className="bg-black/20 rounded-lg p-4 border border-emerald/10">
                      <h4 className="font-semibold text-emerald mb-2">Graphic Design</h4>
                      <p className="text-emerald/70 text-sm">
                        Designing visually compelling layouts for posters, social media, and marketing materials
                      </p>
                    </div>

                    <div className="bg-black/20 rounded-lg p-4 border border-emerald/10">
                      <h4 className="font-semibold text-emerald mb-2">Brand Visual Identity</h4>
                      <p className="text-emerald/70 text-sm">
                        Building consistent visual identities through logos, color systems, and creative guidelines
                      </p>
                    </div>

                    <div className="bg-black/20 rounded-lg p-4 border border-emerald/10">
                      <h4 className="font-semibold text-emerald mb-2">Concept Art & Storytelling</h4>
                      <p className="text-emerald/70 text-sm">
                        Translating ideas into strong visual concepts that communicate emotion and narrative
                      </p>
                    </div>
                  </div>

                </div>
                <div className="bg-gradient-to-r from-emerald/5 to-black/40 border border-emerald/20 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Design Philosophy</h3>
                  <p className="text-emerald/70 mb-6">
                    {settings.philosophy}
                  </p>
                  <p>- My Creative Manifesto</p>
                </div>
                {/* Call to Action */}
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 rounded-2xl p-6 px-40 mt-5 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Let's Work Together</h3>
              <p className="text-emerald/70 mb-6">
                Interested in collaborating? I'd love to hear about your project and discuss how we can bring your vision to life.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-emerald text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}