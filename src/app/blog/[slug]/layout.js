import { getBlogPostBySlug } from '@/data/blogData'
import { getAllCategories, getAllTags } from '@/data/blogData'


// This is a dynamic metadata function that gets the specific blog post metadata
export async function generateMetadata({ params }) {
  // Get the current post
  const post = getBlogPostBySlug(params.slug)
  
  // If the post doesn't exist, return default metadata
  if (!post) {
    return {
      title: 'Article Not Found | Yalors Blog',
      description: 'The article you are looking for does not exist or has been moved.',
    }
  }
  
  // Create an excerpt for the description (clean HTML if needed)
  const description = post.excerpt || post.title
  
  // Return metadata tailored for this post
  return {
    title: `${post.title} | Yalors Blog`,
    description: description,
    keywords: post.tags.join(', ') + ', automation, yalors',
    openGraph: {
      title: post.title,
      description: description,
      url: `https://yalors.tn/blog/${post.slug}`,
      type: 'article',
      images: [
        {
          url: 'https://yalors.tn/images/blog-og-image.jpg', // Ideally, use a post-specific image
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date, // Use a proper ISO date in production
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
    },
    // Add structured data for blog post (helps with SEO)
    alternates: {
      canonical: `https://yalors.tn/blog/${post.slug}`,
    }
  }
}

export default function BlogPostLayout({ children }) {
  return children
}