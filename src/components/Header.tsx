import { Navigation, SiteSettings } from '@/lib/content';
import Image from 'next/image';

interface HeaderProps {
  navigation: Navigation;
  siteSettings: SiteSettings;
}

export default function Header({ navigation }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              className="hover:opacity-90 transition-opacity"
            >
              <Image 
                src="/assets/images/Obsessed_With_Success-SiteLogo.png" 
                alt="Obsessed With Success Logo" 
                width={200}
                height={52}
                className="h-11 md:h-13 w-auto"
              />
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="text-gray-800 hover:text-[#deae54] font-semibold text-lg uppercase tracking-wide transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#deae54] transition-all group-hover:w-full"></span>
                {item.external && (
                  <span className="ml-1 text-xs">↗</span>
                )}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 font-semibold text-lg uppercase tracking-wide transition-colors shadow-lg"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-800 hover:text-[#deae54] focus:outline-none focus:text-[#deae54]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            {navigation.items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="text-gray-800 hover:text-[#deae54] font-semibold text-lg uppercase tracking-wide py-2 transition-colors"
              >
                {item.label}
                {item.external && (
                  <span className="ml-1 text-xs">↗</span>
                )}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 font-semibold text-lg uppercase tracking-wide transition-colors text-center mt-4 shadow-lg"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
} 