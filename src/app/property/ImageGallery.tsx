import Image from 'next/image';
import { Property } from '@/types';

interface ImageGalleryProps {
  images: string[];
  headline: string;
}

export function ImageGallery({ images, headline }: ImageGalleryProps) {
  if (!images || images.length === 0) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {images.map((src, i) => (
        <div
          key={i}
          className="relative aspect-video rounded-lg overflow-hidden border"
          tabIndex={0}
          aria-label={`Property image ${i + 1}: ${headline}`}
          role="img"
          style={{ outline: 'none' }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              window.open(src, '_blank');
            }
          }}
        >
          <Image
            src={src}
            alt={`${headline} - photo ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
