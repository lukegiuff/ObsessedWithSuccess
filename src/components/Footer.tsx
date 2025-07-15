import { SiteSettings } from '@/lib/content';
import Image from 'next/image';

interface FooterProps {
  siteSettings: SiteSettings;
}

export default function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#08192d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image 
                src="/assets/images/Obsessed_With_Success-SiteLogo.png" 
                alt="Obsessed With Success Logo" 
                width={200}
                height={40}
                className="h-10 w-auto"
              />
              <span className="serif-heading text-2xl font-bold tracking-wide">
                <span className="font-light">Obsessed</span>{' '}
                <span className="font-normal">With</span>{' '}
                <span className="font-bold text-[#deae54]">Success</span>
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {siteSettings.site_description}
            </p>
            <p className="text-sm text-gray-400">
              © {currentYear} Obsessed With Success. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Quick Links</h3>
            <div className="space-y-3">
              <a href="#about" className="block text-gray-300 hover:text-[#deae54] transition-colors">
                About Our Approach
              </a>
              <a href="#services" className="block text-gray-300 hover:text-[#deae54] transition-colors">
                Our Services
              </a>
              <a href="#approach" className="block text-gray-300 hover:text-[#deae54] transition-colors">
                The Difference
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-[#deae54] transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Connect With Us</h3>
            <div className="space-y-4">
              <p className="flex items-center space-x-3 text-gray-300">
                <svg className="w-5 h-5 text-[#deae54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href={`mailto:${siteSettings.contact_email}`}
                  className="hover:text-[#deae54] transition-colors"
                >
                  {siteSettings.contact_email}
                </a>
              </p>
              
              {siteSettings.social.linkedin && (
                <p className="flex items-center space-x-3 text-gray-300">
                  <svg className="w-5 h-5 text-[#deae54]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <a
                    href={`https://linkedin.com/${siteSettings.social.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#deae54] transition-colors"
                  >
                    Connect on LinkedIn
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              Built by Operators, Driven by Results. We are Obsessed With Your Success!
            </div>
            <div className="text-xs text-gray-500">
              Content managed through{' '}
              <a href="/admin/" className="hover:text-[#deae54] transition-colors">
                Admin Panel
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 