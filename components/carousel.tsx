'use client';

import { useEffect, useRef, useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, School, Users } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import ScrollReveal from 'components/qr-landing/scroll-reveal';

const testimonials = [
  {
    name: 'Priya Nair',
    description:
      'Ordering took a few minutes, and everything my daughter needed was already packed correctly. It made the start of school feel calm instead of rushed.',
    school: 'Elementary family',
    icon: School,
    grade: '2nd Grade'
  },
  {
    name: 'Daniel Kim',
    description:
      'I liked knowing the kit matched the teacher list exactly. No second-guessing, no extra store run, and no missed items.',
    school: 'Parent of 3rd grader',
    icon: BookOpen,
    grade: '3rd Grade'
  },
  {
    name: 'Marisol Torres',
    description:
      'The supplies felt well chosen and good quality, not random filler. My son was ready for the first day, and I had one less thing to manage.',
    school: 'K-8 family',
    icon: Users,
    grade: '1st Grade'
  },
  {
    name: 'Amina Yusuf',
    description:
      'Between work and two kids, back-to-school shopping usually feels chaotic. This was simple, accurate, and delivered where it needed to go.',
    school: 'Busy parent of two',
    icon: Users,
    grade: '5th Grade'
  },
  {
    name: 'Jasmine Carter',
    description:
      'What stood out most was convenience. We ordered once, and our child walked into class with everything already handled.',
    school: 'Parent of 4th grader',
    icon: School,
    grade: '4th Grade'
  },
  {
    name: 'Mateo Alvarez',
    description:
      'The whole process felt organized and dependable. It saved our family time and helped the first week of school start on the right note.',
    school: 'Parent of 6th grader',
    icon: BookOpen,
    grade: '6th Grade'
  },
  {
    name: 'Leila Haddad',
    description:
      'I appreciated how straightforward it was. The kit was teacher-aligned, the delivery was smooth, and it removed a big stress point from August.',
    school: 'Middle school family',
    icon: School,
    grade: '7th Grade'
  }
];

export function Carousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const syncActiveIndex = () => {
      const nextIndex = cardRefs.current.reduce(
        (closestIndex, card, index) => {
          if (!card) {
            return closestIndex;
          }

          const distance = Math.abs(card.offsetLeft - scroller.scrollLeft);
          const closestCard = cardRefs.current[closestIndex];
          const closestDistance = closestCard
            ? Math.abs(closestCard.offsetLeft - scroller.scrollLeft)
            : Number.POSITIVE_INFINITY;

          return distance < closestDistance ? index : closestIndex;
        },
        0
      );

      setActiveIndex(nextIndex);
    };

    syncActiveIndex();
    scroller.addEventListener('scroll', syncActiveIndex, { passive: true });

    return () => scroller.removeEventListener('scroll', syncActiveIndex);
  }, []);

  const scrollToIndex = (index: number) => {
    const nextIndex = (index + testimonials.length) % testimonials.length;
    const card = cardRefs.current[nextIndex];

    if (!card) {
      return;
    }

    card.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
    setActiveIndex(nextIndex);
  };

  return (
    <div className="relative w-full bg-[#70C8E5] py-8">
      <div className="w-full">
        <div className="mb-5 flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 xl:px-16">
          <div />
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              aria-label="Show previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-[#16313A] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B80A7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#70C8E5]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              aria-label="Show next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-[#16313A] transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B80A7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#70C8E5]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:gap-6 lg:px-10 xl:px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((data, index) => (
            <ScrollReveal
              key={data.name}
              delayMs={index * 70}
              threshold={0.25}
              className="w-[85%] min-w-0 flex-none snap-start sm:w-[48%] lg:w-[34rem] xl:w-[36rem]"
            >
              <div
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
              >
                <Card className="group flex h-full min-h-[260px] flex-col rounded-[28px] border border-white/60 bg-white shadow-[0_20px_48px_rgba(7,59,76,0.14)] transition-transform duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-[#16313A]">{data.name}</CardTitle>
                    <CardDescription className="text-sm text-[#0B80A7]">
                      {`Parent of ${data.grade}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 text-sm leading-6 text-gray-700">
                    {data.description}
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F7FC] text-[#0B80A7] transition-transform duration-500 group-hover:scale-110">
                        <data.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-medium text-[#16313A]">{data.school}</span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 md:hidden">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                activeIndex === index ? 'w-6 bg-[#16313A]' : 'w-2.5 bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
