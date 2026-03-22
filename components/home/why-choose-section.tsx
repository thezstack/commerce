'use client';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

type WhyChooseItem = {
  title: string;
  description: string;
};

type WhyChooseSectionProps = {
  images: {
    first: StaticImageData;
    second: StaticImageData;
    third: StaticImageData;
  };
  items: WhyChooseItem[];
};

const imageConfigs = [
  {
    key: 'first',
    className:
      'absolute left-[6%] top-[10%] h-36 w-36 sm:left-[8%] sm:top-[8%] sm:h-44 sm:w-44 lg:left-[2%] lg:top-[12%] lg:h-48 lg:w-48',
    initial: { opacity: 0, scale: 0.9, x: -24, y: 24, rotate: -4 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0, rotate: -2 },
    delay: 0.05
  },
  {
    key: 'second',
    className:
      'absolute left-[42%] top-[25%] h-40 w-40 sm:left-[40%] sm:top-[22%] sm:h-48 sm:w-48 lg:left-[34%] lg:top-[20%] lg:h-56 lg:w-56',
    initial: { opacity: 0, scale: 0.88, x: 20, y: 20, rotate: 5 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 2 },
    delay: 0.18
  },
  {
    key: 'third',
    className:
      'absolute bottom-[12%] right-[8%] h-32 w-32 sm:bottom-[10%] sm:right-[10%] sm:h-40 sm:w-40 lg:bottom-[8%] lg:right-[4%] lg:h-44 lg:w-44',
    initial: { opacity: 0, scale: 0.9, x: 18, y: 28, rotate: 4 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 1 },
    delay: 0.32
  }
] as const;

const dotConfigs = [
  {
    className:
      'absolute left-[56%] top-[18%] h-10 w-10 bg-[#70C8E5] sm:left-[58%] sm:top-[20%] sm:h-12 sm:w-12 lg:left-[54%] lg:top-[22%] lg:h-14 lg:w-14',
    delay: 0.2,
    duration: 4.5
  },
  {
    className:
      'absolute left-[14%] top-[56%] h-14 w-14 bg-[#CCEBF5] sm:left-[16%] sm:top-[58%] sm:h-16 sm:w-16 lg:left-[10%] lg:top-[62%] lg:h-20 lg:w-20',
    delay: 0.35,
    duration: 5.2
  },
  {
    className:
      'absolute right-[34%] top-[56%] h-14 w-14 bg-[#06D6A0] sm:right-[36%] sm:top-[58%] sm:h-16 sm:w-16 lg:right-[32%] lg:top-[60%] lg:h-20 lg:w-20',
    delay: 0.4,
    duration: 4.8
  },
  {
    className:
      'absolute right-[14%] top-[14%] h-8 w-8 bg-[#FFD166] sm:right-[16%] sm:top-[14%] sm:h-10 sm:w-10 lg:right-[12%] lg:top-[14%] lg:h-12 lg:w-12',
    delay: 0.25,
    duration: 4.1
  }
] as const;

export function WhyChooseSection({ images, items }: WhyChooseSectionProps) {
  const reduceMotion = useReducedMotion();
  const imageMap = {
    first: images.first,
    second: images.second,
    third: images.third
  };

  return (
    <section className="mb-8 bg-[#F8FCFD] py-10 lg:py-16">
      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="w-full px-4 lg:w-1/2 lg:px-0">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mb-2 h-[26rem] max-w-[24rem] sm:h-[30rem] sm:max-w-[28rem] lg:mb-0 lg:h-[32rem] lg:max-w-[32rem]"
            >
              {imageConfigs.map((config) => (
                <motion.div
                  key={config.key}
                  initial={reduceMotion ? false : config.initial}
                  whileInView={reduceMotion ? undefined : config.animate}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.8,
                    delay: config.delay,
                    type: 'spring',
                    stiffness: 110,
                    damping: 16
                  }}
                  className={`${config.className} overflow-hidden rounded-full border-[6px] border-white/90 shadow-[0_16px_38px_rgba(7,59,76,0.16)]`}
                >
                  <Image src={imageMap[config.key]} alt="" fill className="object-cover" />
                </motion.div>
              ))}

              {dotConfigs.map((config) => (
                <motion.div
                  key={config.className}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: config.delay }}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -8, 0],
                          x: [0, 3, 0]
                        }
                  }
                  className={`${config.className} rounded-full shadow-[0_12px_22px_rgba(7,59,76,0.09)]`}
                  style={{
                    animationDelay: `${config.delay}s`
                  }}
                  {...(!reduceMotion
                    ? {
                        transition: {
                          opacity: { duration: 0.45, delay: config.delay },
                          scale: { duration: 0.45, delay: config.delay },
                          y: {
                            duration: config.duration,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          },
                          x: {
                            duration: config.duration + 0.6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }
                        }
                      }
                    : {})}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full overflow-hidden px-4 pt-4 lg:w-1/2 lg:pl-12"
          >
            <div className="px-1 py-6 sm:px-4 sm:py-10">
              <div className="absolute -bottom-8 -right-8 -z-10 h-64 w-64 rounded-full bg-[#FFE7AF] opacity-30" />

              <h2 className="mb-4 text-3xl font-semibold leading-tight text-balance lg:text-4xl">
                Why Parents Choose SchoolKits
              </h2>
              <p className="mb-8 max-w-2xl text-sm leading-6 text-gray-700 sm:text-base">
                Every kit is built from your school&apos;s supply list, packed with
                teacher-approved items, and delivered straight to the classroom.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.18 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="rounded-2xl border border-[#D9EEF4] bg-white/80 p-5 shadow-[0_12px_32px_rgba(11,128,167,0.08)] backdrop-blur-sm"
                  >
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#DFF6F4]">
                      <svg
                        className="text-[#06D6A0]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        width="16"
                        height="16"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-[#16313A]">{item.title}</h3>
                    <p className="text-sm leading-6 text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/schools"
                  className="inline-flex rounded-full border border-[#0B80A7] px-5 py-2.5 text-sm font-semibold text-[#0B80A7] transition-colors duration-200 hover:bg-[#0B80A7] hover:text-white"
                >
                  Find your school
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
