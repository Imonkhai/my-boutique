'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
   
  {
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=85',
    tag: ' ',
    heading: ['Effortless', 'Luxury,', 'Every', 'Season.'],
    sub: 'Flowing silhouettes and premium fabrics that move with you — from morning to midnight.',
  },
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=85',
    tag: '',
    heading: ['Dress to', 'Impress,', 'Always', 'Shine.'],
    sub: 'Statement pieces for every occasion — because you deserve to feel extraordinary every day.',
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85',
    tag: '',
    heading: ['Power', 'Dressing,', 'Redefined', 'Daily.'],
    sub: 'Tailored pieces that command the room — sharp, sophisticated, and unmistakably you.',
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=85',
    tag: '',
    heading: ['Rich', 'Textures,', 'Warm', 'Tones.'],
    sub: 'Wrap yourself in the season\'s finest — cashmere, wool, and leather in earth-inspired palettes.',
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=85',
    tag: '',
    heading: ['Loved by', 'Many,', 'Made for', 'You.'],
    sub: 'Our most coveted pieces — the ones our customers reach for again and again.',
  },
];

const INTERVAL = 5000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Sliding backgrounds ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].image}
            alt={SLIDES[current].tag}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent text-[11px] tracking-[0.5em] uppercase mb-6">
                {SLIDES[current].tag}
              </p>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-[1.05] mb-6">
                {SLIDES[current].heading.map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? <span className="text-gold-gradient">{line}</span> : line}
                  </span>
                ))}
              </h1>

              <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
                {SLIDES[current].sub}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/collections"
              className="px-8 py-4 bg-[#D4AF37] text-[#111111] text-[11px] font-semibold tracking-widest uppercase hover:bg-white transition-all duration-300"
            >
              Shop Collection
            </Link>
            <Link
              href="/new-arrivals"
              className="px-8 py-4 border border-white text-white text-[11px] font-medium tracking-widest uppercase hover:bg-white hover:text-[#111111] transition-all duration-300"
            >
              New Arrivals
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/40 text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/40 text-white hover:bg-white/20 transition-all duration-300"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-[3px] transition-all duration-500 overflow-hidden"
            style={{ width: i === current ? 32 : 16, background: 'rgba(255,255,255,0.35)' }}
          >
            {i === current && (
              <motion.span
                className="absolute inset-0 bg-[#D4AF37]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                style={{ transformOrigin: 'left' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 z-20"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* ── Decorative side text ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-20">
        <div className="w-px h-16 bg-white/30" />
        <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase rotate-90 whitespace-nowrap">
          Gift Collection
        </p>
        <div className="w-px h-16 bg-white/30" />
      </div>
    </section>
  );
}
