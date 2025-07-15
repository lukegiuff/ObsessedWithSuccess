import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import yaml from 'js-yaml';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PageContent {
  slug: string;
  title: string;
  description?: string;
  featured_image?: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  featured_image?: string;
  tags?: string[];
  content: string;
}

export interface SiteSettings {
  site_title: string;
  site_description: string;
  site_logo?: string;
  contact_email: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface NavigationItem {
  label: string;
  url: string;
  external: boolean;
}

export interface Navigation {
  items: NavigationItem[];
}

// Utility function to convert markdown to HTML
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

// Get page content by slug
export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  try {
    const fullPath = path.join(contentDirectory, 'pages', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const htmlContent = await markdownToHtml(content);
    
    return {
      slug,
      title: data.title,
      description: data.description,
      featured_image: data.featured_image,
      content: htmlContent,
    };
  } catch (error) {
    console.error(`Error reading page ${slug}:`, error);
    return null;
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsDirectory = path.join(contentDirectory, 'blog');
    const filenames = fs.readdirSync(postsDirectory);
    
    const posts = await Promise.all(
      filenames
        .filter((name) => name.endsWith('.md'))
        .map(async (filename) => {
          const fullPath = path.join(postsDirectory, filename);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          const htmlContent = await markdownToHtml(content);
          
          return {
            slug: filename.replace(/\.md$/, ''),
            title: data.title,
            date: data.date,
            description: data.description,
            featured_image: data.featured_image,
            tags: data.tags,
            content: htmlContent,
          };
        })
    );
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(contentDirectory, 'blog', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const htmlContent = await markdownToHtml(content);
    
    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      featured_image: data.featured_image,
      tags: data.tags,
      content: htmlContent,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

// Get site settings
export function getSiteSettings(): SiteSettings {
  try {
    const fullPath = path.join(contentDirectory, 'settings', 'general.yml');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return yaml.load(fileContents) as SiteSettings;
  } catch (error) {
    console.error('Error reading site settings:', error);
    // Return default settings if file doesn't exist
    return {
      site_title: 'Modern Website',
      site_description: 'A beautiful, modern website built with Next.js and Decap CMS',
      contact_email: 'hello@example.com',
      social: {},
    };
  }
}

// Get navigation
export function getNavigation(): Navigation {
  try {
    const fullPath = path.join(contentDirectory, 'navigation', 'main.yml');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return yaml.load(fileContents) as Navigation;
  } catch (error) {
    console.error('Error reading navigation:', error);
    // Return default navigation if file doesn't exist
    return {
      items: [
        { label: 'Home', url: '/', external: false },
        { label: 'About', url: '/about', external: false },
        { label: 'Blog', url: '/blog', external: false },
      ],
    };
  }
} 