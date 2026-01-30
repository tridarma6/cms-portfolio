import React from 'react';
import { Head } from '@inertiajs/react';
import { Building, MapPin, Calendar, Briefcase, Award } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Experiences({ experiences, settings }) {
  console.log(experiences);
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const calculateDuration = (startDate, endDate, isCurrent) => {
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate);

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();

    let totalMonths = years * 12 + months;
    if (end.getDate() < start.getDate()) {
      totalMonths--;
    }

    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;

    let duration = '';
    if (displayYears > 0) {
      duration += `${displayYears} yr${displayYears > 1 ? 's' : ''}`;
    }
    if (displayMonths > 0) {
      if (duration) duration += ' ';
      duration += `${displayMonths} mo${displayMonths > 1 ? 's' : ''}`;
    }

    return duration || '< 1 mo';
  };

  const getTotalYearsExperience = (experiences) => {
    if (!experiences.length) return 0;

    const totalYears = experiences.reduce((total, e) => {
      if (!e.start_date) return total;

      const start = new Date(e.start_date);
      const end = e.is_current || !e.end_date
        ? new Date()
        : new Date(e.end_date);

      const diff = end - start;
      const years = diff / (1000 * 60 * 60 * 24 * 365.25);

      return total + years;
    }, 0);

    return Math.floor(totalYears);
  };



  return (
    <>
      <Head title="Experience - Eclipse Studio" />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-emerald-50 bg-[url('/assets/images/bg-portfolio-hd.png')] bg-cover bg-center bg-fixed">
        <Header currentPage="experiences" site_title={settings.site_title || 'Eclipse Studio'} />

        <main className="pt-24 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-raluweh">Professional Experience</h1>
              <p className="text-emerald/60 text-lg max-w-2xl mx-auto font-bold">
                A journey through roles, companies, and achievements that have shaped my career in design and development
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald/50 via-emerald/30 to-emerald/10"></div>

              <div className="space-y-2">
                {experiences.map((experience, index) => (
                  <div key={experience.id} className="relative flex gap-8">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald to-emerald/70 rounded-full flex items-center justify-center shadow-lg">
                        <Briefcase size={24} className="text-black" />
                      </div>
                    </div>

                    {/* Experience Card */}
                    <div className="flex-1 pb-8 mt-8">
                      <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 rounded-2xl p-8 hover:border-emerald/40 transition-all duration-300 group">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-2">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                              {experience.role}
                            </h3>
                            <div className="flex items-center gap-2 text-emerald font-medium mb-3">
                              <Building size={18} />
                              {experience.company}
                            </div>
                          </div>

                          {/* Duration badge */}
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald/10 text-emerald rounded-full text-sm font-medium ml-4">
                              <Calendar size={14} />
                              {calculateDuration(experience.start_date, experience.end_date, experience.is_current)}
                            </span>
                          </div>
                        </div>

                        {/* Date range */}
                        <div className="flex items-center gap-2 text-emerald/60 mb-4">
                          <Calendar size={16} />
                          <span>
                            {formatDate(experience.start_date)} - {
                              experience.is_current
                                ? 'Present'
                                : formatDate(experience.end_date)
                            }
                          </span>
                          {experience.is_current && (
                            <span className="ml-2 px-2 py-1 bg-emerald/20 text-emerald text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <div className="text-emerald/80 leading-relaxed">
                          {experience.description.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-3 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {/* Decorative element */}
                        <div className="mt-6 flex justify-end">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald/20 to-emerald/5 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                            <Award size={20} className="text-emerald" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald mb-2">{experiences.length}</div>
                <div className="text-emerald/60 text-sm">Positions Held</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald mb-2">
                  {experiences.filter(e => e.is_current).length}
                </div>
                <div className="text-emerald/60 text-sm">Current Roles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald mb-2">
                  {getTotalYearsExperience(experiences)}y
                </div>
                <div className="text-emerald/60 text-sm">Years Experience</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-emerald mb-2">
                  {new Set(experiences.map(e => e.company)).size}
                </div>
                <div className="text-emerald/60 text-sm">Companies</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-emerald/5 to-black/40 border border-emerald/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">Ready to Work Together?</h3>
                <p className="text-emerald/70 mb-6">
                  My experience spans multiple industries and technologies. Let's discuss how I can contribute to your next project.
                </p>
                <div className="flex gap-4 justify-center">
                  <a
                    href="/projects"
                    className="px-6 py-3 bg-emerald/10 border border-emerald/30 text-emerald font-semibold rounded-lg hover:bg-emerald/20 transition-colors"
                  >
                    View My Work
                  </a>
                  <a
                    href="/contact"
                    className="px-6 py-3 bg-emerald text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors"
                  >
                    Get In Touch
                  </a>
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