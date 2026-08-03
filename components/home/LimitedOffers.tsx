'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Animations';

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function LimitedOffers() {
  const [target] = useState(() => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  const { days, hours, minutes, seconds } = useCountdown(target);

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Mins', value: minutes },
    { label: 'Secs', value: seconds },
  ];

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-[#111111]/85" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <Reveal>
          <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-4">Limited Time</p>
          <h2 className="font-display text-4xl lg:text-6xl font-semibold mb-4">
            End of Season Sale
          </h2>
          <p className="text-white/70 text-lg mb-10">Up to 40% off on selected pieces. Don&apos;t miss out.</p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-12">
            {units.map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#D4AF37]">
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] tracking-widest uppercase text-white/60">{label}</span>
              </div>
            ))}
          </div>

          <Link
            href="/sale"
            className="inline-flex px-10 py-4 bg-[#D4AF37] text-[#111111] text-[11px] font-semibold tracking-widest uppercase hover:bg-white transition-all duration-300"
          >
            Shop the Sale
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
