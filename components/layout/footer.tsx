import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../media/logo.png';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white px-4 py-8 text-[#1B1B1B] md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src={Logo} alt="SchoolKits Logo" width={40} height={40} />
              <span className="ml-2 font-['Futura'] text-2xl font-extrabold leading-[110%]">
                SchoolKits
              </span>
            </Link>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <div>
              <h3 className="mb-2 font-bold">CONTACT US</h3>
              <a href="mailto:hello@schoolkits.org" className="text-[#0B80A7] hover:underline">
                hello@schoolkits.org
              </a>
            </div>
            <div>
              <h3 className="mb-2 font-bold">PARTNER WITH US</h3>
              <Link href="/contact" className="text-[#0B80A7] hover:underline">
                Get in touch now
              </Link>
            </div>
          </div>
        </div>
        <hr className="mb-6 border-t border-gray-200" />
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="mb-4 text-sm md:mb-0">Copyright © {currentYear} SchoolKits.</p>
          <div className="flex gap-4">
            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src="/path-to-facebook-icon.png" alt="Facebook" width={24} height={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image src="/path-to-instagram-icon.png" alt="Instagram" width={24} height={24} />
            </a> */}
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-6 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/privacy-policy" className="text-[#0B80A7] hover:underline">
              Privacy Policy
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/terms" className="text-[#0B80A7] hover:underline">
              Terms of Service
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/affiliate-disclosure" className="text-[#0B80A7] hover:underline">
              Affiliate Disclosure
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/texas-private-schools" className="text-[#0B80A7] hover:underline">
              TEFA
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/blog" className="text-[#0B80A7] hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
