import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    projectType: '',
    message: ''
  });

  // Replace this placeholder with the actual WhatsApp number (including country code, without + or spaces)
  const WHATSAPP_NUMBER = '919360879428';

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      projectType: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, projectType, message } = formData;
    if (!name.trim() || !projectType || !message.trim()) return;

    // Compile formatted WhatsApp message
    const formattedMessage = `Hello Darious!

*Name:* ${name.trim()}
*Type of Work:* ${projectType}

*Brief Message:*
${message.trim()}`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');

    // Reset Form fields
    setFormData({
      name: '',
      projectType: '',
      message: ''
    });
  };

  const handleKeyDown = (e) => {
    // If Enter is pressed in the textarea without Shift, submit the form
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <section id="contact" className="py-24 bg-accent text-white relative z-10 border-t border-gray-800 opacity-95">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Details Column */}
          <div className="reveal">
            <p className="font-cursive text-orange-400 text-2xl mb-2 tracking-wide">Get in Touch</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Let's Create <br />
              Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Extraordinary.</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-md">
              Have a project in mind, want to collaborate, or just say hello? Fill in your details below to start crafting your story directly on WhatsApp.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Email Me</p>
                  <a href="mailto:dariousdarious38@gmail.com" className="text-white hover:text-orange-400 transition-colors font-medium">
                    dariousdarious38@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Location</p>
                  <p className="text-white font-medium">Tamil Nadu, India</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="reveal reveal-delay-1">
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-orange-400 transition-colors placeholder:text-gray-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="project-type" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Type of Work
                </label>
                <select
                  id="project-type"
                  required
                  value={formData.projectType}
                  onChange={handleSelectChange}
                  className="w-full bg-gray-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-orange-400 transition-colors"
                >
                  <option value="" disabled className="text-gray-600">
                    Select a service
                  </option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Motion Graphics">Motion Graphics</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Brand Identity">Brand Identity</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Brief Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-orange-400 transition-colors placeholder:text-gray-600"
                  placeholder="Tell me about your project, goals, and timeline (Press Enter to send via WhatsApp)..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-white text-accent rounded-full font-bold hover:bg-orange-400 hover:text-accent transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.114.957 11.5.957c-5.436 0-9.86 4.37-9.864 9.8 0 1.702.469 3.364 1.358 4.881L2.01 21.14l5.731-1.502c.001-.001 0 0 0 0zm11.367-7.64c-.328-.164-1.939-.956-2.239-1.065-.3-.11-.518-.165-.737.165-.219.329-.848 1.066-1.039 1.285-.19.22-.382.246-.71.082-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.946-1.824-2.274-.19-.329-.02-.507.144-.67.147-.146.328-.382.492-.574.164-.19.219-.329.328-.548.11-.219.055-.411-.027-.574-.082-.164-.737-1.777-1.01-2.434-.266-.64-.539-.553-.737-.563-.19-.01-.409-.012-.628-.012-.219 0-.574.082-.875.411-.3.329-1.147 1.122-1.147 2.733 0 1.61 1.173 3.169 1.337 3.388.164.22 2.307 3.523 5.59 4.946.78.338 1.39.54 1.867.691.783.249 1.497.214 2.061.13.629-.094 1.939-.793 2.213-1.559.273-.766.273-1.422.191-1.559-.082-.137-.3-.22-.628-.383z" />
                </svg>
                Send via WhatsApp
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
