import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import HQA from '../media/HQALogo.png';
import ILM from '../media/ilmLogo.png';
import ImanAcademy from '../media/imanAcademy.png';

const testimonials = [
  {
    name: 'Aisha Rahman',
    description:
      'School Kits offers great value for money, with top-quality products that last. Their website is user-friendly, and delivery is always on time. They’re my first choice for school supplies.',
    school: 'Houston Quran Academy',
    icon: HQA
  },
  {
    name: 'Mohamed Al-Farsi',
    description:
      'The customer service at School Kits is fantastic. They promptly addressed a query I had and ensured my order was delivered on time. Their dedication to customer satisfaction is evident.',
    school: 'Houston Quran Academy',
    icon: HQA
  },
  {
    name: 'Omar Siddiqui',
    description:
      'School Kits’ products are durable and reliable, which is essential for my kids. I appreciate the quality and affordability of their supplies. It’s been a great experience shopping with them.',

    school: 'ILM Academy',
    icon: ILM
  },
  {
    name: 'Idris Al-Amir',
    description:
      'School Kits has been our go-to for school supplies for several years now. Their products are of high quality and perfectly cater to our children’s educational needs. Their efficient service and timely delivery make them stand out.',
    school: 'Iman Academy SE',
    icon: ImanAcademy
  },
  {
    name: 'Samir Malik',
    description:
      'The range and quality of supplies School Kits offers are unmatched. Their commitment to providing durable and affordable educational products is evident in every purchase we’ve made. Truly a reliable partner for parents and students.',
    school: 'Houston Quran Academy',
    icon: HQA
  },
  {
    name: 'Huda Khaled',
    description:
      'I am consistently impressed by the quality and range of products at School Kits. Their commitment to providing excellent educational supplies makes school shopping easy and satisfying.',
    school: 'Iman Academy SW',
    icon: ImanAcademy
  },
  {
    name: 'Zainab Ali',
    description:
      'Every year, School Kits exceeds my expectations with their fantastic range of school supplies. Their efficient service and quality products make them a preferred choice for our family.',
    school: 'Ilm Academy',
    icon: ILM
  }
];

export function Carousel() {
  return (
    <div className="relative w-full overflow-hidden bg-[#70C8E5] py-6">
      <div className="flex animate-carousel">
        {[...testimonials, ...testimonials].map((data, i) => (
          <div
            key={`testimonial-${i}`}
            className="w-full flex-none px-4 sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{data.name}</CardTitle>
                <CardDescription>Parent of 2nd Grader</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">{data.description}</CardContent>
              <CardFooter>
                <div className="flex items-center">
                  <Image width={20} height={20} src={data.icon} alt={'school logo'} />
                  <span className="ml-2 text-xs">{data.school}</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}