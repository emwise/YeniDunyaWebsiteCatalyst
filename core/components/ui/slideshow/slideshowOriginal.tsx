// import useEmblaCarousel from 'embla-carousel-react';
// import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
// import { StaticImageData } from 'next/image';
// import { useTranslations } from 'next-intl';
// import { useEffect, useReducer, useState } from 'react';

// import { Image } from '~/components/image';
// import { cn } from '~/lib/utils';

// import { Button } from '../button';

// interface Link {
//   label: string;
//   href: string;
// }

// interface Image {
//   altText: string;
//   blurDataUrl?: string;
//   src: string | StaticImageData;
// }

// interface Slide {
//   cta?: Link;
//   description?: string;
//   image?: Image;
//   title: string;
// }

// interface Props {
//   className?: string;
//   interval?: number;
//   slides: Slide[];
// }

// const Slideshow = ({ className, interval = 15_000, slides }: Props) => {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

//   const [isHoverPaused, setIsHoverPaused] = useState(false);
//   const [isPaused, togglePaused] = useReducer((val: boolean) => !val, false);

//   const [activeSlide, setActiveSlide] = useState(1);

//   const [visibilityState, setVisibilityState] = useState<
//     DocumentVisibilityState | Omit<string, 'hidden' | 'visible'>
//   >('');
//   const t = useTranslations('Components.Slideshow');

//   useEffect(() => {
//     const autoplay = setInterval(() => {
//       if (isPaused) return;
//       if (isHoverPaused) return;
//       if (!emblaApi) return;
//       if (visibilityState === 'hidden') return;

//       emblaApi.scrollNext();
//     }, interval);

//     return () => clearInterval(autoplay);
//   }, [emblaApi, interval, isHoverPaused, isPaused, visibilityState]);

//   useEffect(() => {
//     window.addEventListener('visibilitychange', () => {
//       setVisibilityState(document.visibilityState);
//     });

//     return () => window.removeEventListener('visibilitychange', () => null);
//   }, [visibilityState]);

//   useEffect(() => {
//     if (!emblaApi) return;

//     // We must reinitialize Embla on client-side navigation
//     // E.g., navigating from Homepage to PDP to Homepage
//     emblaApi.reInit();

//     const initialize = () => {
//       setActiveSlide(emblaApi.selectedScrollSnap() + 1);
//     };

//     const onSelect = () => {
//       setActiveSlide(emblaApi.selectedScrollSnap() + 1);
//     };

//     emblaApi.on('slidesInView', initialize);
//     emblaApi.on('reInit', initialize);
//     emblaApi.on('select', onSelect);
//   }, [emblaApi, setActiveSlide]);

//   const scrollPrev = () => {
//     if (emblaApi) emblaApi.scrollPrev();
//   };

//   const scrollNext = () => {
//     if (emblaApi) emblaApi.scrollNext();
//   };

//   return (
//     <section
//       aria-label={t('slideshow')}
//       aria-roledescription="carousel"
//       className={cn('relative -mx-6 overflow-hidden xsm:h-[200px] md:h-[600px] lg:h-[600px] sm:-mx-10 md:-mx-12', className)}
//       onBlur={() => setIsHoverPaused(false)}
//       onFocus={() => setIsHoverPaused(true)}
//       onMouseEnter={() => setIsHoverPaused(true)}
//       onMouseLeave={() => setIsHoverPaused(false)}
//     >
//       <div ref={emblaRef}>
//         <ul className="flex" id="slideshow-slides">
//           {slides.map((slide, index) => (
//             <li
//               aria-label={t('slideNo', { n: index + 1, total: slides.length })}
//               aria-roledescription={t('slide')}
//               className="min-w-0 shrink-0 grow-0 basis-full"
//               inert={index === activeSlide - 1 ? undefined : true}
//               key={index}
//             >
//               <div className="relative xsm:h-[200px] md:h-[600px] lg:h-[600px]">
//                 {slide.image && (
//                   <Image
//                     alt={slide.image.altText}
//                     blurDataURL={slide.image.blurDataUrl}
//                     className="absolute -z-10 object-contain"
//                     fill
//                     placeholder="blur"
//                     priority={index === 0}
//                     sizes="(max-width: 1536px) 100vw, 1536px"
//                     src={slide.image.src}
//                   />
//                 )}
//                 <div
//                   className={cn(
//                     'flex flex-col gap-4 px-12 pb-48 pt-36', 
//                     !slide.image && 'bg-gray-100',
//                   )}
//                 >
//                   <h2 className="text-5xl font-black lg:text-6xl">{slide.title}</h2>
//                   {Boolean(slide.description) && <p className="max-w-xl">{slide.description}</p>}
//                   {slide.cta && (
//                     <Button asChild variant='white-gray-background' className="w-fit">
//                       <a href={slide.cta.href}>{slide.cta.label}</a>
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="absolute bottom-12 start-12 flex items-center gap-4 bg-zinc-500/50 text-zinc-200 rounded-full">
//         <button
//           aria-label={isPaused ? t('play') : t('pause')}
//           className="inline-flex h-12 w-12 items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
//           onClick={() => {
//             togglePaused();
//           }}
//         >
//           {isPaused ? <Play /> : <Pause />}
//         </button>
//         <button
//           aria-controls="slideshow-slides"
//           aria-label={t('previousSlide')}
//           className="inline-flex h-12 w-12 items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
//           onClick={scrollPrev}
//         >
//           <ArrowLeft />
//         </button>
//         <span aria-atomic="false" aria-live={isPaused ? 'polite' : 'off'} className="font-semibold">
//           {t('slideNo', { n: activeSlide, total: slides.length })}
//         </span>
//         <button
//           aria-controls="slideshow-slides"
//           aria-label={t('nextSlide')}
//           className="inline-flex h-12 w-12 items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
//           onClick={scrollNext}
//         >
//           <ArrowRight />
//         </button>
//       </div>
//     </section>
//   );
// };

// export { Slideshow };
