'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-6"
          >
            New Collection 2025
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-[1.05] mb-6"
          >
            Elegant
            <br />
            <span className="text-gold-gradient">Fashion,</span>
            <br />
            Timeless
            <br />
            Style.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-white/70 text-base lg:text-lg leading-relaxed mb-10 max-w-md"
          >
            Discover our curated collection of luxury fashion pieces, crafted for the modern woman who values elegance and quality.
          </motion.p>

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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* Decorative side text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-white/30" />
        <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase rotate-90 whitespace-nowrap">
          Veloura Boutique
        </p>
        <div className="w-px h-16 bg-white/30" />
      </div>
    </section>
  );
}
