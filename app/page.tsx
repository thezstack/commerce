import HomeMotion from 'components/home/home-motion';
import BookingButton from 'components/marketing/booking-button';
import ClassroomVideo from 'components/home/classroom-video';
import styles from 'components/home/homepage.module.css';
import { ArrowDown, ArrowRight, Gift, HandHeart, HeartHandshake, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import avery from '../media/Avery.svg';
import crayola from '../media/crayola-card.webp';
import elmer from '../media/elmer.svg';
import expo from '../media/expo.svg';
import fiskar from '../media/Fiskar.png';
import mead from '../media/Mead.png';
import kleenex from '../media/kleenex.svg';
import sharpie from '../media/sharpie-card.webp';
import supplies from '../media/Frame 37280bottom_cta.png';

export const metadata = {
  title: 'A school-supply program that does more | SchoolKits',
  description:
    'Custom school supply kits, packed by SchoolKits and delivered to classrooms. Talk with us about fundraising, staff appreciation, and sponsorship options for your school.',
  openGraph: { type: 'website' }
};

const benefits = [
  {
    title: 'Fundraising',
    icon: HandHeart,
    description:
      'Have a fundraising goal in mind? Let’s discuss how your school’s supply program could support it and what options are available.'
  },
  {
    title: 'Staff appreciation',
    icon: Gift,
    description:
      'Ask how staff appreciation could be part of your supply program. We’ll talk through the available options for recognizing your team.'
  },
  {
    title: 'Sponsorships',
    icon: HeartHandshake,
    description:
      'Interested in community support for your students? Talk with us about sponsorship options and what may be available for your school.'
  }
];
const steps = [
  {
    number: '01',
    title: 'Share your school’s supply lists.',
    owner: 'YOUR SCHOOL + SCHOOLKITS',
    description:
      'Share your grade-level supply lists, estimated student count, and timeline. We work with your team to build custom kits around those requirements.'
  },
  {
    number: '02',
    title: 'Families order through your school’s page.',
    owner: 'YOUR SCHOOL + FAMILIES',
    description:
      'Share your school’s ordering page and deadlines with parents. Families choose their school and purchase their child’s kit online.'
  },
  {
    number: '03',
    title: 'We pack the kits and deliver to classrooms.',
    owner: 'SCHOOLKITS',
    description:
      'We handle packing and classroom delivery. Your school confirms when and where the kits should arrive and who we should contact.'
  }
];

export default function HomePage() {
  return (
    <HomeMotion className={styles.home}>
      <div className={styles.parentLink}>
        Already a SchoolKits family?{' '}
        <Link href="/schools">
          Shop by school <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <section className={styles.hero} aria-labelledby="homepage-heading">
        <ClassroomVideo />
        <div className={styles.tint} />
        <div className={styles.heroContent}>
          <h1 id="homepage-heading">
            Your school-supply program should do{' '}
            <span data-reveal="0" data-motion="emphasis" className={styles.titleEmphasis}>
              more.
            </span>
          </h1>
          <p className={styles.heroCopy}>
            Custom kits from your school’s lists, packed by us and delivered to classrooms.
          </p>
          <div className={styles.actions}>
            <BookingButton className={styles.primary}>
              Partner with us <ArrowRight size={18} aria-hidden="true" />
            </BookingButton>
            <Link className={styles.secondary} href="#how-it-works">
              See how it works <ArrowDown size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.benefits} aria-label="More possibilities for your school">
        {benefits.map(({ title, icon: Icon, description }) => (
          <article key={title}>
            <div className={styles.benefitTitle}>
              <span>
                <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h2>{title}</h2>
            </div>
            <p>{description}</p>
          </article>
        ))}
      </section>
      <section className={styles.brandSection} aria-labelledby="brand-heading">
        <p className={styles.eyebrow}>QUALITY STARTS WITH THE SUPPLIES</p>
        <h2 id="brand-heading">Familiar brands for your classrooms.</h2>
        <p className={styles.brandCopy}>
          Crayola, Elmer’s, and other familiar names belong in the classroom. We build kits around
          your supply lists, using these brands alongside teacher-endorsed house brands.
        </p>
        <ul className={styles.brands}>
          {[
            { src: crayola, name: 'Crayola' },
            { src: elmer, name: 'Elmer’s' },
            { src: expo, name: 'EXPO' },
            { src: avery, name: 'Avery' },
            { src: sharpie, name: 'Sharpie' },
            { src: fiskar, name: 'Fiskars' },
            { src: kleenex, name: 'Kleenex' },
            { src: mead, name: 'Mead' }
          ].map((brand) => (
            <li data-reveal="0" data-motion="brand" key={brand.name}>
              <div data-brand-card className={styles.brandCard}>
                <Image src={brand.src} alt={brand.name} width={160} height={160} />
                <span aria-hidden="true">{brand.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section id="how-it-works" className={styles.how}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>HOW THE PROGRAM WORKS</p>
          <h2>
            From your supply lists
            <br />
            to your classrooms.
          </h2>
          <p>
            Your school shares the lists and keeps families informed. Parents order online, and we
            handle the kits. Here’s how we work together.
          </p>
        </div>
        <div className={styles.steps}>
          {steps.map((step) => (
            <article key={step.number}>
              <span className={styles.number}>{step.number}</span>
              <p className={styles.owner}>{step.owner}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.evidence}>
        <div className={styles.suppliesImage}>
          <Image
            src={supplies}
            alt="A selection of school supplies ready for the classroom"
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className={styles.evidenceCopy}>
          <p className={styles.eyebrow}>BUILT AROUND THE TEACHER’S LIST</p>
          <h2>
            Every kit starts
            <br />
            with your teachers’ lists.
          </h2>
          <p>
            Each grade or class has its own supply needs. We work from your school’s requirements to
            put together the kits and coordinate delivery with your team.
          </p>
          <ul>
            <li>
              <Check size={19} aria-hidden="true" /> Custom kits by grade or class
            </li>
            <li>
              <Check size={19} aria-hidden="true" /> Packing handled by the SchoolKits team
            </li>
            <li>
              <Check size={19} aria-hidden="true" /> Delivery coordinated with your school
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.partnership}>
        <p className={styles.eyebrow}>LET’S START WITH YOUR SCHOOL</p>
        <h2>
          Let’s plan your school’s
          <br />
          supply program.
        </h2>
        <p>
          Tell us what your school needs and when you need it. We’ll walk through the program
          together, including any fundraising, staff appreciation, or sponsorship questions you
          have.
        </p>
        <BookingButton className={styles.primary}>
          Partner with us <ArrowRight size={18} aria-hidden="true" />
        </BookingButton>
        <p className={styles.parentNote}>
          Here to order for your child? <Link href="/schools">Shop by school</Link>
        </p>
      </section>
    </HomeMotion>
  );
}
