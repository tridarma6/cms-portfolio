import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Contact({ contactInfo = {}, settings }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await axios.post('/messages', formData);
      setFeedback({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFeedback({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.contact_email || 'hello@eclipse.studio',
      href: `mailto:${contactInfo.email || 'hello@eclipse.studio'}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactInfo.phone || '+1 (555) 123-4567',
      href: `tel:${contactInfo.phone || '+15551234567'}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: contactInfo.location || 'San Francisco, CA',
      href: '#'
    }
  ];

  return (
    <>
      <Head title="Contact - Eclipse Studio" />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-emerald-50">
        <Header currentPage="contact" site_title={settings.site_title || 'Eclipse Studio'}/>

        <main className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-raluweh">Get In <span className='text-emerald'>Touch</span></h1>
              <p className="text-emerald/60 text-lg max-w-2xl mx-auto">
                Ready to bring your vision to life? Let's discuss your project and create something extraordinary together.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-white/5 to-white/1 backdrop-blur-lg border border-emerald/20 rounded-2xl p-8 shadow-[0_20px_40px_rgba(0,199,122,0.1)] hover:shadow-[0_30px_60px_rgba(0,199,122,0.15)] transition-all duration-300">
                  <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>

                  {feedback && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                      feedback.type === 'success'
                        ? 'bg-emerald/10 border border-emerald/20 text-emerald'
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}>
                      {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                      {feedback.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-emerald/80 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-emerald/40 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/50 transition-colors ${
                          errors.name ? 'border-red-500' : 'border-emerald/30'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-emerald/80 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-emerald/40 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/50 transition-colors ${
                          errors.email ? 'border-red-500' : 'border-emerald/30'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-emerald/80 mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-emerald/40 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/50 transition-colors ${
                          errors.subject ? 'border-red-500' : 'border-emerald/30'
                        }`}
                        placeholder="Project inquiry"
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-emerald/80 mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 bg-black/20 border rounded-lg text-white placeholder-emerald/40 focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/50 transition-colors resize-none ${
                          errors.message ? 'border-red-500' : 'border-emerald/30'
                        }`}
                        placeholder="Tell me about your project..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-emerald text-black font-bold rounded-lg hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="order-1 lg:order-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    {contactItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block bg-gradient-to-r from-black/40 to-emerald/5 border border-emerald/20 rounded-xl p-6 hover:border-emerald/40 hover:shadow-[0_10px_30px_rgba(0,199,122,0.1)] transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-emerald/10 rounded-lg group-hover:bg-emerald/20 transition-colors">
                            <item.icon className="w-6 h-6 text-emerald" />
                          </div>
                          <div>
                            <div className="text-sm text-emerald/60 uppercase tracking-wide">{item.label}</div>
                            <div className="text-white font-medium group-hover:text-emerald-300 transition-colors">{item.value}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald/5 to-black/40 border border-emerald/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Why choose me?
                  </h3>

                  <ul className="space-y-2 text-emerald/70">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald rounded-full"></div>
                      Creative and meaningful visual design
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald rounded-full"></div>
                      UX Illustration with surreal & post-modern approach
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald rounded-full"></div>
                      Professional collaboration and communication
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald rounded-full"></div>
                      Reliable delivery and consistent quality
                    </li>
                  </ul>
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