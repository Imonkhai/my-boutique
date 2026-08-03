import { Star } from 'lucide-react';
import { cn } from '@/utils';

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export default function StarRating({ rating, reviews, size = 'sm', className }: StarRatingProps) {
  const starSize = size === 'sm' ? 12 : 16;
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={starSize}
            className={i < Math.floor(rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'fill-gray-200 text-gray-200'}
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-[11px] text-[#6B6B6B]">({reviews})</span>
      )}
    </div>
  );
}
