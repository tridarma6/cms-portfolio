import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Filter, ExternalLink, Calendar, Tag } from 'lucide-react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

export default function ProjectsIndex({ projects, tags, settings }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesTag = !selectedTag || project.tags.some(tag => tag.id === selectedTag);
      const matchesSearch = !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTag && matchesSearch;
    });
  }, [projects, selectedTag, searchQuery]);

  const getPrimaryImage = (project) => {
    const primaryImage = project.images.find(img => img.is_primary);
    return primaryImage ? `/storage/${primaryImage.filename}` : null;
  };

  return (
    <>
      <Head title="Projects - Eclipse Studio" />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-emerald-50">
        <Header currentPage="projects" site_title={settings.site_title || 'Eclipse Studio'} />

        <main className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">My Projects</h1>
              <p className="text-emerald/60 text-lg max-w-2xl mx-auto">
                A showcase of creative work spanning design, development, and digital experiences
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-black/20 border border-emerald/30 rounded-lg text-white placeholder-emerald/40 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/50"
                  />
                </div>

                {/* Tag Filters */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter size={18} className="text-emerald/60" />
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      !selectedTag
                        ? 'bg-emerald text-black'
                        : 'bg-emerald/10 text-emerald hover:bg-emerald/20'
                    }`}
                  >
                    All
                  </button>
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => setSelectedTag(tag.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTag === tag.id
                          ? 'bg-emerald text-black'
                          : 'bg-emerald/10 text-emerald hover:bg-emerald/20'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-emerald/40 text-lg mb-4">No projects found</div>
                <p className="text-emerald/60">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group block"
                  >
                    <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 rounded-2xl overflow-hidden hover:border-emerald/40 hover:shadow-[0_20px_40px_rgba(0,199,122,0.15)] transition-all duration-300 h-full">
                      {/* Project Image */}
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

                      {/* Project Content */}
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

                        {/* Links */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
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
            <div className="mt-16 grid grid-cols-2 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald mb-2">{projects.length}</div>
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