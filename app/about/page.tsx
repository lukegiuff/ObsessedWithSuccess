import { getPageBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const aboutContent = await getPageBySlug('about');
  
  if (!aboutContent) {
    return {
      title: 'Page Not Found',
    };
  }
  
  return {
    title: aboutContent.title,
    description: aboutContent.description,
  };
}

export default async function AboutPage() {
  const aboutContent = await getPageBySlug('about');
  
  if (!aboutContent) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {aboutContent.title}
        </h1>
        {aboutContent.description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {aboutContent.description}
          </p>
        )}
      </div>

      {/* Featured Image */}
      {aboutContent.featured_image && (
        <div className="mb-12">
          <img
            src={aboutContent.featured_image}
            alt={aboutContent.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: aboutContent.content }} />
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Let's Work Together
        </h2>
        <p className="text-gray-600 mb-6">
          Ready to bring your ideas to life? We'd love to hear from you.
        </p>
        <a
          href="mailto:hello@example.com"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Get In Touch
        </a>
      </div>
    </div>
  );
} 