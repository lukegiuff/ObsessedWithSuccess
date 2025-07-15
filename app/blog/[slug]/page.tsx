import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Blog */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Post Header */}
      <header className="mb-12">
        <div className="mb-6">
          <time
            dateTime={post.date}
            className="text-sm text-gray-500 font-medium"
          >
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="mb-12">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-16">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Post Footer */}
      <footer className="border-t border-gray-200 pt-8">
        <div className="flex justify-between items-center">
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            ← Back to All Posts
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Published on {new Date(post.date).toLocaleDateString()}</p>
          </div>
        </div>
      </footer>

      {/* Call to Action */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Enjoyed this post?
        </h2>
        <p className="text-gray-600 mb-6">
          Check out our other articles or get in touch to discuss your project.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Read More Posts
          </Link>
          <Link
            href="/about"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            About Us
          </Link>
        </div>
      </div>
    </article>
  );
} 