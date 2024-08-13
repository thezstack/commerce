import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../media/logo.png';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-[#1B1B1B] py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src={Logo} alt="SchoolKits Logo" width={40} height={40} />
              <span className="ml-2 font-['Futura'] text-2xl font-extrabold leading-[110%]">SchoolKits</span>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h3 className="font-bold mb-2">CONTACT US</h3>
              <a href="mailto:hello@schoolkits.org" className="text-[#0B80A7] hover:underline">hello@schoolkits.org</a>
            </div>
            <div>
              <h3 className="font-bold mb-2">PARTNER WITH US</h3>
              <Link href="/contact" className="text-[#0B80A7] hover:underline">Get in touch now</Link>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-200 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            Copyright © {currentYear} SchoolKits.
          </p>
          <div className="flex gap-4">
            {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src="/path-to-facebook-icon.png" alt="Facebook" width={24} height={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image src="/path-to-instagram-icon.png" alt="Instagram" width={24} height={24} />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;