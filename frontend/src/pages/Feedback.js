import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { ArrowLeft, Star, Send, MapPin, Calendar, Clock } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const FEEDBACK_URL = typeof window !== 'undefined' ? `${window.location.origin}/feedback` : '';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_a32939dc-1aea-4860-99bb-b62686aca83e/artifacts/5ggfxigz_HibiscuPlus%20Limited%20Dynamic%20Letterform%20Integration%20%281%29.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    blend: '',
    rating: 0,
    taste: '',
    wouldBuy: '',
    comments: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/feedback`, formData);
      setSubmitted(true);
      toast.success('Thank you for your feedback!');
    } catch (err) {
      toast.error('Submission failed. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0507] text-[#F7F0E3] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-8 border border-[#C9A96E]/40 rounded-full flex items-center justify-center">
            <Star className="h-8 w-8 text-[#C9A96E]" />
          </div>
          <h2 className="text-3xl font-light mb-4">Thank You</h2>
          <p className="text-[#CDBAB5] mb-8 font-light">Your feedback helps us craft the perfect blend. We appreciate you being part of the HibiscusPlus journey.</p>
          <Link to="/">
            <Button className="bg-[#C9A96E] text-[#0A0507] hover:bg-[#D4B87A] rounded-none text-xs uppercase tracking-[0.15em] px-8 py-5" data-testid="back-home-btn">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0507] text-[#F7F0E3]">
      <Toaster position="top-center" theme="dark" />
      <div className="grain-overlay" />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0507]/60 backdrop-blur-2xl border-b border-[#F7F0E3]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={LOGO_URL} alt="HibiscusPlus" className="h-12 w-auto" data-testid="header-logo" />
          </Link>
          <Link to="/">
            <Button variant="outline" className="border-[#F7F0E3]/20 text-[#F7F0E3] hover:bg-[#F7F0E3]/5 rounded-none text-xs uppercase tracking-[0.15em]" data-testid="back-btn">
              <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Home
            </Button>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Event Header */}
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] mb-4">Tea Tasting Event</p>
              <h1 className="text-4xl md:text-6xl font-light mb-6">
                Chester <span className="italic">Experience</span>
              </h1>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-[#CDBAB5]">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#C9A96E]" />
                  Saturday, 9th May 2025
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#C9A96E]" />
                  Chester, UK
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* QR Code */}
              <motion.div variants={fadeUp} className="lg:col-span-2">
                <div className="border border-[#F7F0E3]/10 p-8 md:p-12 text-center sticky top-28" data-testid="qr-section">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] mb-6">Scan to Share Feedback</p>
                  <div className="bg-[#F7F0E3] p-6 inline-block mb-6" data-testid="qr-code">
                    <QRCodeSVG
                      value={FEEDBACK_URL || 'https://hibiscusplus.co.uk/feedback'}
                      size={200}
                      bgColor="#F7F0E3"
                      fgColor="#0A0507"
                      level="H"
                      imageSettings={{
                        src: LOGO_URL,
                        height: 40,
                        width: 40,
                        excavate: true
                      }}
                    />
                  </div>
                  <p className="text-sm text-[#CDBAB5] font-light">
                    Point your phone camera at this QR code to leave your feedback after tasting our blends.
                  </p>
                  <div className="mt-8 pt-8 border-t border-[#F7F0E3]/10">
                    <p className="text-xs text-[#8A7670] mb-2">Blends Available for Tasting</p>
                    <div className="space-y-2">
                      <p className="text-sm text-[#F7F0E3]">Metabo Ignite</p>
                      <p className="text-sm text-[#F7F0E3]">Bloom & Flush</p>
                      <p className="text-sm text-[#F7F0E3]">Glucose Guard</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Feedback Form */}
              <motion.div variants={fadeUp} className="lg:col-span-3">
                <div className="border border-[#F7F0E3]/10 p-8 md:p-12" data-testid="feedback-form-section">
                  <h3 className="text-2xl font-light mb-2">Share Your Experience</h3>
                  <p className="text-sm text-[#8A7670] mb-8 font-light">Your honest feedback shapes our blends.</p>

                  <form onSubmit={handleSubmit} className="space-y-6" data-testid="feedback-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-[0.15em] text-[#8A7670] mb-2 block">Name</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-transparent border-[#F7F0E3]/15 text-[#F7F0E3] rounded-none focus:border-[#C9A96E]"
                          placeholder="Your name"
                          required
                          data-testid="feedback-name"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.15em] text-[#8A7670] mb-2 block">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-transparent border-[#F7F0E3]/15 text-[#F7F0E3] rounded-none focus:border-[#C9A96E]"
                          placeholder="Your email"
                          required
                          data-testid="feedback-email"
                        />
                      </div>
                    </div>

                    {/* Blend Selection */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-[#8A7670] mb-3 block">Which blend did you try?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Metabo Ignite', 'Bloom & Flush', 'Glucose Guard'].map(blend => (
                          <button
                            key={blend}
                            type="button"
                            onClick={() => setFormData({...formData, blend})}
                            className={`p-3 border text-sm transition-all duration-300 ${
                              formData.blend === blend
                                ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]'
                                : 'border-[#F7F0E3]/15 text-[#CDBAB5] hover:border-[#F7F0E3]/30'
                            }`}
                            data-testid={`blend-${blend.replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            {blend}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-[#8A7670] mb-3 block">Overall Rating</label>
                      <div className="flex gap-2" data-testid="star-rating">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            onClick={() => setFormData({...formData, rating: star})}
                            className="transition-transform hover:scale-110"
                            data-testid={`star-${star}`}
                          >
                            <Star
                              className={`h-8 w-8 transition-colors ${
                                star <= (hoveredStar || formData.rating)
                                  ? 'text-[#C9A96E] fill-[#C9A96E]'
                                  : 'text-[#F7F0E3]/20'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Taste Description */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-[#8A7670] mb-2 block">How would you describe the taste?</label>
                      <textarea
                        value={formData.taste}
                        onChange={(e) => setFormData({...formData, taste: e.target.value})}
                        className="w-full bg-transparent border border-[#F7F0E3]/15 text-[#F7F0E3] rounded-none p-3 min-h-[80px] focus:border-[#C9A96E] focus:outline-none resize-none"
                        placeholder="Bold, refreshing, spicy, smooth..."
                        data-testid="feedback-taste"
                      />
                    </div>

                    {/* Would Buy */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-[#8A7670] mb-3 block">Would you purchase this blend?</label>
                      <div className="flex gap-3">
                        {['Absolutely', 'Maybe', 'Not for me'].map(option => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFormData({...formData, wouldBuy: option})}
                            className={`px-5 py-2 border text-sm transition-all duration-300 ${
                              formData.wouldBuy === option
                                ? 'border-[#C9A96E] bg-[#C9A96E]/10 text-[#C9A96E]'
                                : 'border-[#F7F0E3]/15 text-[#CDBAB5] hover:border-[#F7F0E3]/30'
                            }`}
                            data-testid={`would-buy-${option.replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Comments */}
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-[#8A7670] mb-2 block">Additional Comments</label>
                      <textarea
                        value={formData.comments}
                        onChange={(e) => setFormData({...formData, comments: e.target.value})}
                        className="w-full bg-transparent border border-[#F7F0E3]/15 text-[#F7F0E3] rounded-none p-3 min-h-[100px] focus:border-[#C9A96E] focus:outline-none resize-none"
                        placeholder="Anything else you'd like us to know..."
                        data-testid="feedback-comments"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#C9A96E] text-[#0A0507] hover:bg-[#D4B87A] rounded-none text-sm uppercase tracking-[0.15em] py-6"
                      data-testid="feedback-submit"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#F7F0E3]/5 py-8 px-6 text-center">
        <p className="text-xs text-[#8A7670]">
          &copy; 2025 HIBISCUSPLUS LIMITED. Company No. 17024055
        </p>
      </footer>
    </div>
  );
}
