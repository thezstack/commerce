import BookingButton from 'components/marketing/booking-button';
import ClassroomVideo from 'components/home/classroom-video';
import styles from 'components/home/homepage.module.css';
import { ArrowDown, ArrowRight, Gift, HandHeart, HeartHandshake, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import avery from '../media/Avery.svg';
import crayola from '../media/Crayola.svg';
import elmer from '../media/elmer.svg';
import expo from '../media/expo.svg';
import fiskar from '../media/Fiskar.png';
import mead from '../media/Mead.png';
import kleenex from '../media/kleenex.svg';
import sharpie from '../media/sharpie.svg';
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
      'Put your supply program to work for your school. Talk with us about available fundraising options and how they could fit your goals.'
  },
  {
    title: 'Staff appreciation',
    icon: Gift,
    description:
      'Make your team part of the conversation. Ask about staff appreciation options alongside your school’s supply program.'
  },
  {
    title: 'Sponsorships',
    icon: HeartHandshake,
    description:
      'Explore ways to involve your community in supporting students. We’ll discuss sponsorship options and what may be available for your school.'
  }
];
const steps = [
  {
    number: '01',
    title: 'Your lists. Your classroom needs.',
    owner: 'YOUR SCHOOL + SCHOOLKITS',
    description:
      'Share your grade-level supply lists, estimated student count, and timeline. We work with your team to build custom kits around those requirements.'
  },
  {
    number: '02',
    title: 'A simple way for families to order.',
    owner: 'YOUR SCHOOL + FAMILIES',
    description:
      'Share your school’s ordering page and deadlines with parents. Families choose their school and purchase their child’s kit online.'
  },
  {
    number: '03',
    title: 'We pack. We deliver.',
    owner: 'SCHOOLKITS',
    description:
      'Our team handles the packing and classroom delivery. Your school confirms the delivery timing, classroom details, and point of contact with us.'
  }
];

export default function HomePage() {
  return (
    <div className={styles.home}>
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
          <p className={styles.eyebrow}>MORE FOR YOUR SCHOOL. READY FOR YOUR CLASSROOMS.</p>
          <h1 id="homepage-heading">Your school-supply program should do more.</h1>
          <p className={styles.heroCopy}>
            Bring more to your school community—with fundraising, staff appreciation, and
            sponsorship options worth a conversation.
          </p>
          <p className={styles.serviceCopy}>
            Custom kits from your supply lists. Packed by us. Delivered to classrooms.
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
        <h2 id="brand-heading">Familiar brands. Ready for their classrooms.</h2>
        <p className={styles.brandCopy}>
          From Crayola to Elmer’s, we build kits with well-known brands and teacher-endorsed house
          brands, guided by your school’s supply lists.
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
            <li key={brand.name}>
              <Image src={brand.src} alt={brand.name} width={160} height={160} />
              <span aria-hidden="true">{brand.name}</span>
            </li>
          ))}
        </ul>
      </section>
      <section id="how-it-works" className={styles.how}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>THE SCHOOL SUPPLIES, HANDLED</p>
          <h2>
            A thoughtful program.
            <br />A straightforward process.
          </h2>
          <p>
            You know your classrooms. We help turn their supply lists into kits, with a clear role
            for everyone along the way.
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
            The supplies they asked for.
            <br />
            The preparation we handle.
          </h2>
          <p>
            Our program starts with your school’s requirements, with familiar brands and
            teacher-endorsed house brands to meet classroom needs.
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
          What could your supply
          <br />
          program do for you?
        </h2>
        <p>
          Bring your lists, your timeline, and your goals. We’ll talk through the program and the
          fundraising, staff appreciation, and sponsorship options available to your school.
        </p>
        <BookingButton className={styles.primary}>
          Partner with us <ArrowRight size={18} aria-hidden="true" />
        </BookingButton>
        <p className={styles.parentNote}>
          Here to order for your child? <Link href="/schools">Shop by school</Link>
        </p>
      </section>
    </div>
  );
}
