'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/constants';
import StarRating from '@/components/ui/StarRating';
import { Reveal } from '@/components/ui/Animations';

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-[#D4AF37] text-[11px] tracking-[0.5em] uppercase mb-3">Client Love</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#111111]">What Our Clients Say</h2>
        </Reveal>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {TESTIMONIALS.map(t => (
            <SwiperSlide key={t.id}>
              <div className="bg-[#F8F8F8] p-8 h-full flex flex-col">
                <Quote size={28} className="text-[#D4AF37] mb-4" />
                <p className="text-[#111111] text-sm leading-relaxed flex-1 mb-6 italic">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#111111]">{t.name}</p>
                    <p className="text-xs text-[#6B6B6B]">{t.location}</p>
                    <StarRating rating={t.rating} className="mt-1" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
