import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import BestSellers from '@/components/home/BestSellers';
import NewArrivals from '@/components/home/NewArrivals';
import BrandStory from '@/components/home/BrandStory';
import LimitedOffers from '@/components/home/LimitedOffers';
import Testimonials from '@/components/home/Testimonials';
import InstagramGallery from '@/components/home/InstagramGallery';
import BlogPreview from '@/components/home/BlogPreview';
import FAQPreview from '@/components/home/FAQPreview';

export const metadata: Metadata = {
  title: 'Gift Collection — Elegant Fashion, Timeless Style',
  description: 'Discover curated luxury fashion at Gift Collection. Shop premium dresses, blazers, accessories and more.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BestSellers />
      <NewArrivals />
      <BrandStory />
      <LimitedOffers />
      <Testimonials />
      <InstagramGallery />
      <BlogPreview />
      <FAQPreview />
    </>
  );
}
