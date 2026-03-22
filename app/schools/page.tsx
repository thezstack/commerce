import SchoolSearchShell from 'components/schools/school-search-shell';
import { getSchoolIndex } from 'lib/schools';

export const metadata = {
  title: 'Find Your School',
  description: 'Search for your school and see whether School Kits has online kits available.'
};

export default async function SchoolsPage() {
  const schools = await getSchoolIndex();

  return (
    <section className="relative min-h-[calc(100svh-88px)] overflow-hidden bg-[#F8FCFD] sm:min-h-[calc(100svh-96px)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="school-finder-blob-float absolute -left-16 top-10 h-40 w-40 rounded-full bg-[#CCEBF5] opacity-70 sm:h-56 sm:w-56 lg:h-72 lg:w-72" />
        <div className="school-finder-blob-pulse absolute right-[-3rem] top-16 h-32 w-32 rounded-full bg-[#FFE7AF] opacity-80 sm:h-44 sm:w-44 lg:h-56 lg:w-56" />
        <div className="school-finder-dot-drift absolute left-[10%] top-[42%] h-6 w-6 rounded-full bg-[#06D6A0] opacity-80 sm:h-8 sm:w-8" />
        <div className="school-finder-dot-drift absolute right-[12%] top-[58%] h-10 w-10 rounded-full bg-[#A9DDED] opacity-80 [animation-delay:-5s] sm:h-14 sm:w-14" />
        <div className="school-finder-blob-float absolute bottom-[-5rem] left-[12%] h-48 w-48 rounded-full bg-white/70 blur-3xl [animation-delay:-7s] sm:h-64 sm:w-64 lg:h-80 lg:w-80" />
        <div className="school-finder-blob-pulse absolute bottom-[-6rem] right-[-2rem] h-52 w-52 rounded-full bg-[#E7F7FB] blur-3xl [animation-delay:-4s] sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
      </div>

      <div className="relative container mx-auto w-full px-4 pt-12 pb-10 sm:px-6 sm:pt-16 sm:pb-12 lg:px-8 lg:pt-20 lg:pb-16">
        <SchoolSearchShell schools={schools} />
      </div>
    </section>
  );
}
