'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Building, 
  Clock, 
  CheckCircle,
  MessageSquare,
  User,
  FileText
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    state: '',
    message: '',
    service: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'registration', label: 'Startup Registration' },
    { value: 'mentorship', label: 'Mentorship Program' },
    { value: 'networking', label: 'Networking Events' },
    { value: 'resources', label: 'Resource Access' },
    { value: 'partnership', label: 'Partnership Inquiry' },
  ];

  const states = [
    'Assam',
    'Arunachal Pradesh',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Tripura',
    'Sikkim'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const to = "connect.startupnortheast@gmail.com";
  const subject = `Contact from ${formData.name}`;
  const body = `
  Name: ${formData.name}
  Email: ${formData.email}
  Company: ${formData.company}
  State: ${formData.state}
  Service: ${formData.service}
  Message: ${formData.message}`;

  const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
};



  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['connect.startupnortheast@gmail.com', 'nibird.dev@gmail.com'],
      color: 'from-red-600 to-red-800'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 60000 12345', '+91 70000 54321'],
      color: 'from-blue-600 to-blue-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/20 to-blue-50/20">
      <div className="relative container mx-auto px-4 py-12 md:py-20">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 border border-red-200 shadow-sm mb-6">
            <img src="/Startup_NE.png" alt="Startup Northeast Logo" className="w-5 h-5" />
            <span className="text-sm font-medium text-slate-800">
              Connect With Us
            </span>
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Get in <span className="bg-gradient-to-r from-red-800 to-red-900 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg text-slate-600">
            Reach out to Startup Northeast. We’re here to support innovation across Assam & Northeast India.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-white rounded-2xl border p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-red-600" />
                Contact Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className={`bg-gradient-to-br ${item.color} rounded-xl p-5 text-white`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold">{item.title}</h3>
                      </div>
                      {item.details.map((d, i) => (
                        <p key={i} className="text-sm">{d}</p>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Offices */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-red-600" />
                  Our Northeast Offices
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-bold mb-1">Guwahati HQ</h4>
                    <p className="text-sm text-slate-600">
                      Startup Hub Assam<br />
                      Guwahati, Assam
                    </p>
                  </div>
                  {/* <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-bold mb-1">Shillong Office</h4>
                    <p className="text-sm text-slate-600">
                      Innovation Centre Meghalaya<br />
                      Shillong
                    </p>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Why Choose */}
            <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-8 border">
              <h3 className="text-xl font-bold mb-4">
                Why Partner With Startup Northeast?
              </h3>
              <ul className="space-y-3">
                {[
                  'Deep understanding of Northeast India’s startup ecosystem',
                  'Strong network of local founders & mentors',
                  'Experience with government & incubator programs',
                  'Regional market insights',
                  'Grassroots innovation support',
                  'Founder-first approach'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl border p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-slate-600">We’ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input name="name" placeholder="Full Name" required onChange={handleChange} className="w-full p-3 border rounded-xl" />
                <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} className="w-full p-3 border rounded-xl" />
                <input name="company" placeholder="Startup / Company Name" onChange={handleChange} className="w-full p-3 border rounded-xl" />

                <select name="state" required onChange={handleChange} className="w-full p-3 border rounded-xl">
                  <option value="">Select State</option>
                  {states.map(s => <option key={s}>{s}</option>)}
                </select>

                <select name="service" required onChange={handleChange} className="w-full p-3 border rounded-xl">
                  {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>

                <textarea name="message" rows="5" required placeholder="Your message..." onChange={handleChange} className="w-full p-3 border rounded-xl" />

                <Button type="submit" className="w-full bg-red-700 text-white py-3 rounded-xl">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
