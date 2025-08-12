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
  parsedSections?: {
    heroQuote?: string;
    services?: {
      intro?: string;
      items?: ServiceSection[];
    };
    approach?: {
      traditional: string[];
      ourApproach: string[];
    };
    contactMessage?: string;
    // New structured fields
    aboutApproach?: {
      title: string;
      intro: string;
      points: string[];
    };
    differenceSection?: {
      title: string;
      subtitle: string;
      traditional: {
        title: string;
        points: string[];
      };
      our_approach: {
        title: string;
        points: string[];
      };
      quote: string;
    };
    contactSection?: {
      title: string;
      subtitle: string;
      intro: string;
      expectations: string[];
      cta_text: string;
      email_subject: string;
    };
    callToAction?: {
      title: string;
      content: string;
    };
  };
}

export interface ServiceSection {
  title: string;
  description: string;
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

// Parse markdown content into structured sections
function parseMarkdownSections(content: string): PageContent['parsedSections'] {
  const lines = content.split('\n');
  const sections: PageContent['parsedSections'] = {
    services: {
      intro: undefined,
      items: []
    },
    approach: {
      traditional: [],
      ourApproach: []
    }
  };
  
  // Extract hero quote (first paragraph with bold text)
  const firstParagraph = lines.find(line => line.includes('**') && line.includes('technology professionals'));
  if (firstParagraph) {
    sections.heroQuote = firstParagraph.replace(/\*\*/g, '').trim();
  }
  
  // Parse services directly by finding ### headers that look like services
  let currentService: Partial<ServiceSection> = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('### ') && (
      line.includes('Technology') || 
      line.includes('Executive') || 
      line.includes('Strategic') || 
      line.includes('Professional') ||
      line.includes('Recruiting') ||
      line.includes('Consulting') ||
      line.includes('Staffing')
    )) {
      // Save previous service if exists
      if (currentService.title && currentService.description?.trim()) {
        sections.services!.items!.push({
          title: currentService.title,
          description: currentService.description.trim()
        });
      }
      
      // Start new service
      currentService = {
        title: line.replace('### ', '').trim(),
        description: ''
      };
      
      // Look ahead for the description
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].trim();
        if (nextLine.startsWith('###') || nextLine.startsWith('##') || nextLine === '---') {
          break;
        }
        if (nextLine) {
          currentService.description = currentService.description 
            ? currentService.description + ' ' + nextLine 
            : nextLine;
        }
      }
    }
  }
  
  // Save final service
  if (currentService.title && currentService.description?.trim()) {
    sections.services!.items!.push({
      title: currentService.title,
      description: currentService.description.trim()
    });
  }
  
  // Services successfully parsed from markdown
  
  // Extract contact message from the last section
  const lastSectionIndex = content.lastIndexOf('## Experience the Technology Difference');
  if (lastSectionIndex !== -1) {
    const lastSection = content.substring(lastSectionIndex);
    const messageMatch = lastSection.match(/Ready to work with recruiters[^*]+/);
    if (messageMatch) {
      sections.contactMessage = messageMatch[0].trim();
    }
  }
  
  return sections;
}

// Get page content by slug
export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  try {
    const fullPath = path.join(contentDirectory, 'pages', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const htmlContent = await markdownToHtml(content);
    
               // Use structured frontmatter data if available, otherwise parse markdown
           let parsedSections: PageContent['parsedSections'] = {};
           
           if (data.hero_quote || data.services || data.about_approach || data.call_to_action || data.difference_section || data.contact_section) {
             // Use structured frontmatter data
             parsedSections = {
               heroQuote: data.hero_quote,
               services: data.services ? {
                 intro: data.services.intro,
                 items: data.services.items || data.services || [] // Handle both old and new format
               } : undefined,
               approach: data.about_approach ? {
                 traditional: [], // Legacy field
                 ourApproach: data.about_approach.points || []
               } : undefined,
               contactMessage: data.call_to_action?.content,
               // Add new structured fields
               aboutApproach: data.about_approach,
               differenceSection: data.difference_section,
               contactSection: data.contact_section,
               callToAction: data.call_to_action
             };
           } else {
             // Fallback to parsing markdown content
             parsedSections = parseMarkdownSections(content);
           }
    
    return {
      slug,
      title: data.title,
      description: data.description,
      featured_image: data.featured_image,
      content: htmlContent,
      parsedSections,
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
      		contact_email: 'hello@owsconsultinggroup.com',
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