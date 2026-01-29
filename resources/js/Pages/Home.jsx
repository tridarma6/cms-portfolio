import React from 'react';
import { Head } from '@inertiajs/react';
import AnimatedBG from '../Components/AnimatedBG';
import ProjectThumb from '../Components/ProjectThumb';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Carousel from '../Components/Carousel';
import FloatingOverlay from '../Components/FloatingOverlay';

export default function Home({ projects = [], settings = {} }) {
  // Create project card components
  const projectCards = projects.map((project, idx) => (
    <article key={project.id} className="rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 hover:border-emerald/40 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,199,122,0.15)] transition-all duration-300 group h-full">
      <ProjectThumb index={idx} project={project} />
      <div className="p-5">
        <h3 className="text-white font-bold text-lg group-hover:text-emerald-300 transition-colors">{project.title}</h3>
        <p className="mt-2 text-emerald/60">{project.description}</p>
        {project.website_url && (
          <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-3 py-1 text-sm bg-emerald/10 border border-emerald/30 text-emerald rounded-full hover:bg-emerald/20 transition-colors">
            View Project
          </a>
        )}
      </div>
    </article>
  ));

  return (
    <>
      <Head title="Cinematic Portfolio" />
      <div className="min-h-screen flex flex-col bg-black text-emerald-50 bg-[url('/assets/images/bg-portfolio-hd.png')] bg-cover bg-center bg-fixed">
        <FloatingOverlay />
        <Header currentPage="home" site_title={settings.site_title} />

        <main className="flex-1">
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0"/>
            {/* style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.6))'}} */}
            <div className="relative z-10 text-center px-6 max-w-4xl">
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight animate-floaty font-raluweh">Indonesia Based 
                <br/>
                <span className='text-emerald'>
                Visual Artist
                </span>
                <br/>
                <span>
                Portfolio
                </span>
                <br/>
              </h1>
              <p className="mt-4 text-white font-normal text-lg font-jakarta">{settings.site_description || 'A cinematic, surreal portfolio exploring light, glass and emerald neon.'}</p>
              <div className="mt-8 flex justify-center gap-4">
                <a href="/contact" className="px-5 py-3 rounded-xl font-semibold bg-emerald/30 border border-emerald/60 text-white hover:shadow-[0_18px_60px_rgba(0,199,122,0.12)] transform transition">Start a Project</a>
              </div>
            </div>
          </section>

          <section id="works" className="py-12">
            <h2 className="max-w-7xl mx-auto px-6 text-2xl font-extrabold text-emerald/60">Featured Works</h2>
            <div className="max-w-7xl mx-auto px-6 mt-6">
              <Carousel items={projectCards} itemsPerSlide={{ base: 1, sm: 2, lg: 3 }} />
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-4xl mx-auto px-6 rounded-2xl bg-gradient-to-r from-black/60 via-emerald/5 to-black/50 border border-emerald/10 p-10 text-center">
              <h2 className="text-2xl font-extrabold">Let's build something otherworldly</h2>
              <p className="mt-3 text-emerald/60">Available for commissions and collaborations. Tell me about your project.</p>
              <a id="contact" href="mailto:hello@eclipse.studio" className="inline-block mt-6 px-6 py-3 rounded-full bg-emerald text-black font-bold">Get In Touch</a>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
