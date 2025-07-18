import { getPageBySlug, getSiteSettings } from '@/lib/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function Home() {
  const homeContent = await getPageBySlug('home');
  const siteSettings = getSiteSettings();
  
  if (!homeContent) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src={homeContent.featured_image || '/assets/images/heroimg.png'} 
            alt="Hero background" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#08192d]/50 z-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="serif-heading text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-lg">
            <span className="font-light">Obsessed</span>{' '}
            <span className="font-normal">With</span>{' '}
            <span className="font-bold text-[#deae54]">Success</span>
          </h1>
          
          <p className="serif-heading text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow-md">
            {homeContent.description}
          </p>
          
          <div className="mb-12">
            <p className="text-lg md:text-xl text-[#deae54] font-medium italic drop-shadow-md">
              &ldquo;What separates us is that we are telecommunications professionals that have worked in the space, 
              so we know what good looks like regardless of resume.&rdquo;
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#contact"
              className="bg-[#deae54] hover:bg-[#deae54]/90 text-white px-10 py-4 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-[#deae54]"
            >
              Start a Conversation
            </a>
            <a
              href="#about"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-10 py-4 text-lg font-medium transition-all duration-300"
            >
              Learn Our Approach
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <a href="#about" className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="serif-heading text-4xl md:text-5xl font-light text-slate-900 mb-6">
              About Our <span className="font-normal">Approach</span>
            </h2>
            <div className="w-24 h-1 bg-[#deae54] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-xl text-slate-700 leading-relaxed">
                Traditional recruiting firms focus on matching keywords and credentials. 
                We focus on matching <strong className="text-slate-900">potential with purpose</strong>.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our team consists of industry veterans who have held the very positions we&rsquo;re helping to fill. 
                This insider perspective allows us to identify what others miss.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-[#deae54] rounded-full mt-3"></div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">Identify Hidden Talent</h3>
                  <p className="text-slate-600">We see potential that others overlook, focusing on capability over credentials.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-[#deae54] rounded-full mt-3"></div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">Assess Cultural Fit</h3>
                  <p className="text-slate-600">Understanding beyond surface-level qualifications to ensure lasting success.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-[#deae54] rounded-full mt-3"></div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">Understand Real Challenges</h3>
                  <p className="text-slate-600">We&rsquo;ve been in your shoes and know what each role truly demands.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="serif-heading text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Our <span className="font-normal">Services</span>
            </h2>
            <div className="w-24 h-1 bg-[#deae54] mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive talent solutions backed by real-world experience and industry expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#deae54]/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#deae54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4">Telecommunications Executive Recruiting</h3>
              <p className="text-slate-600 leading-relaxed">
                Premium talent acquisition for C-suite and senior leadership positions in telecommunications and network infrastructure. 
                We understand what it takes to lead telecom transformation because we&rsquo;ve led it.
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#deae54]/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#deae54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4">Telecom Strategic Consulting</h3>
              <p className="text-slate-600 leading-relaxed">
                Organizational development and talent strategy consulting for telecommunications companies, informed by 
                real-world operational experience in network deployments and technology transitions.
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#deae54]/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#deae54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 mb-4">Telecommunications Professional Staffing</h3>
              <p className="text-slate-600 leading-relaxed">
                Mid-level to senior professional placements in network engineering, RF optimization, and telecom operations 
                with a focus on long-term success and industry expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-24 bg-[#08192d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="serif-heading text-4xl md:text-5xl font-light text-white mb-6">
              The <span className="font-normal text-[#deae54]">Difference</span>
            </h2>
            <div className="w-24 h-1 bg-[#deae54] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-white">
              <h3 className="serif-heading text-3xl font-light mb-8">Traditional Recruiting</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center space-x-3">
                  <span className="text-red-400">×</span>
                  <span>Focuses on keyword matching</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-red-400">×</span>
                  <span>Relies solely on resume credentials</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-red-400">×</span>
                  <span>Limited telecommunications industry understanding</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-red-400">×</span>
                  <span>Transactional, one-size-fits-all approach</span>
                </li>
              </ul>
            </div>

            <div className="text-white">
              <h3 className="serif-heading text-3xl font-light mb-8 text-[#deae54]">Our Approach</h3>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Evaluates telecommunications expertise and cultural fit</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Understands complex telecom technology requirements</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Telecommunications industry veteran insight</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Long-term partnership with scalable expertise</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-16">
            <blockquote className="serif-heading text-2xl md:text-3xl font-light text-[#deae54] italic max-w-4xl mx-auto leading-relaxed">
              &ldquo;We don&rsquo;t just place candidates. We elevate careers and transform organizations 
              through the power of experience-driven insight.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="serif-heading text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Start the <span className="font-normal">Conversation</span>
            </h2>
            <div className="w-24 h-1 bg-[#deae54] mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ready to work with recruiters who truly understand the telecommunications industry? 
              Let&rsquo;s discuss how our specialized expertise becomes your competitive advantage.
            </p>
          </div>

          <div className="bg-slate-50 p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-medium text-slate-900 mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <p className="flex items-center space-x-3 text-slate-600">
                    <svg className="w-5 h-5 text-[#deae54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${siteSettings.contact_email}`} className="hover:text-[#deae54] transition-colors">
                      {siteSettings.contact_email}
                    </a>
                  </p>
                  
                  {siteSettings.social.linkedin && (
                    <p className="flex items-center space-x-3 text-slate-600">
                      <svg className="w-5 h-5 text-[#deae54]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <a 
                        href={`https://linkedin.com/${siteSettings.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="hover:text-[#deae54] transition-colors"
                      >
                        LinkedIn
                      </a>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-medium text-slate-900 mb-6">What to Expect</h3>
                <div className="space-y-4 text-slate-600">
                  <p>✓ Initial telecommunications consultation within 24 hours</p>
                  <p>✓ Customized telecom talent strategy discussion</p>
                  <p>✓ No obligation, just industry-focused conversation</p>
                  <p>✓ Insights from telecommunications industry veterans</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <a
                href={`mailto:${siteSettings.contact_email}?subject=Talent Strategy Consultation`}
                className="bg-[#deae54] hover:bg-[#deae54]/90 text-white px-12 py-4 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
