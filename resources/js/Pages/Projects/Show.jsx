import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

export default function ProjectShow({ project, settings }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = project.images.sort((a, b) => a.position - b.position);
  const primaryImage = images.find(img => img.is_primary) || images[0];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <Head title={`${project.title}`} />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-emerald-50">
        <Header currentPage="projects" site_title={settings.site_title || 'Suryas Portfolio'} />

        <main className="pt-24 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            {/* Back Button */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-emerald/70 hover:text-emerald transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to Projects
            </Link>

            {/* Project Header */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Project Info */}
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                      {project.title}
                    </h1>
                    {project.is_featured && (
                      <span className="px-3 py-1 bg-emerald/20 text-emerald text-sm rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-emerald/80 text-lg mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span
                          key={tag.id}
                          className="px-3 py-1 bg-emerald/10 text-emerald rounded-full text-sm font-medium"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-emerald/60">
                      <Calendar size={16} />
                      <span>Published {new Date(project.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors"
                      >
                        <ExternalLink size={18} />
                        View Live
                      </a>
                    )}
                  </div>
                </div>

                {/* Primary Image */}
                <div className="lg:w-1/2">
                  {primaryImage && (
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black/20">
                      <img
                        src={`/storage/${primaryImage.filename}`}
                        alt={primaryImage.caption || project.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Image Gallery */}
            {images.length > 1 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black/20 mb-4">
                    <img
                      src={`/storage/${images[currentImageIndex].filename}`}
                      alt={images[currentImageIndex].caption || `${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {images[currentImageIndex].caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <p className="text-white text-sm">{images[currentImageIndex].caption}</p>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  {images.length > 1 && (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={prevImage}
                        className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
                      >
                        <ChevronLeft size={20} className="text-emerald" />
                      </button>

                      <div className="flex gap-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-emerald' : 'bg-emerald/30'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={nextImage}
                        className="p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
                      >
                        <ChevronRight size={20} className="text-emerald" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Related Projects or Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald/5 to-black/40 border border-emerald/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Like what you see?</h3>
                <p className="text-emerald/70 mb-6">
                  Check out more projects or get in touch to discuss your next idea.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/projects"
                    className="px-6 py-3 bg-emerald/10 border border-emerald/30 text-emerald font-semibold rounded-lg hover:bg-emerald/20 transition-colors"
                  >
                    View All Projects
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-emerald text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}