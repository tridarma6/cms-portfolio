import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ExternalLink, Calendar } from 'lucide-react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

export default function ProjectsIndex({ projects, tags, settings }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesPosition =
        selectedPosition === 'All' || project.position === selectedPosition;

      const matchesTag =
        !selectedTag || project.tags.some(tag => tag.id === selectedTag);

      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesPosition && matchesTag && matchesSearch;
    });
  }, [projects, selectedPosition, selectedTag, searchQuery]);

  const getPrimaryImage = (project) => {
    const primaryImage = project.images.find(img => img.is_primary);
    return primaryImage ? `/storage/${primaryImage.filename}` : null;
  };

  return (
    <>
      <Head title="Projects" />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-emerald-50">
        <Header currentPage="projects" site_title={settings.site_title || 'Suryas Portfolio'} />

        <main className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-raluweh">
                My Projects
              </h1>
              <p className="text-emerald/60 text-lg max-w-2xl mx-auto">
                A showcase of creative work spanning design, development, and digital experiences
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-3 mb-12 flex-wrap">
              {['All', 'Full-time', 'Part-time', 'Freelance'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedPosition(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
                    ${
                      selectedPosition === type
                        ? 'bg-emerald text-black border-emerald'
                        : 'bg-black/20 text-emerald border-emerald/20 hover:bg-emerald/20'
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-emerald/40 text-lg mb-4">No projects found</div>
                <p className="text-emerald/60">Try adjusting your filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(project => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group block"
                  >
                    <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 rounded-2xl overflow-hidden hover:border-emerald/40 hover:shadow-[0_20px_40px_rgba(0,199,122,0.15)] transition-all duration-300 h-full">

                      {/* Image */}
                      <div className="aspect-video overflow-hidden">
                        {getPrimaryImage(project) ? (
                          <img
                            src={getPrimaryImage(project)}
                            alt={project.title}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald/20 to-emerald/5 flex items-center justify-center">
                            <div className="text-emerald/40 text-4xl font-bold">
                              {project.title.charAt(0).toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                            {project.title}
                          </h3>
                          {project.is_featured && (
                            <span className="px-2 py-1 bg-emerald/20 text-emerald text-xs rounded-full font-medium">
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="text-emerald/70 mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tags */}
                        {project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag.id}
                                className="px-2 py-1 bg-black/30 text-emerald/80 text-xs rounded-full"
                              >
                                {tag.name}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 bg-black/30 text-emerald/60 text-xs rounded-full">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div>
                            {project.project_url && (
                              <ExternalLink size={16} className="text-emerald/60 group-hover:text-emerald transition-colors" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-emerald/60 text-sm">
                            <Calendar size={14} />
                            {new Date(project.published_at).getFullYear()}
                          </div>
                        </div>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald mb-2">
                  {projects.length}
                </div>
                <div className="text-emerald/60 text-sm">Total Projects</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-emerald mb-2">
                  {projects.filter(p => p.project_url).length}
                </div>
                <div className="text-emerald/60 text-sm">Live Sites</div>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
