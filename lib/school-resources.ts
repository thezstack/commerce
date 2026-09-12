import type { BlogPost } from 'lib/shopify/types';

// Keep existing school-focused articles discoverable without changing Shopify records.
const featuredResources: Record<string, { category: string; description: string }> = {
  'why-more-schools-are-turning-to-pre-packaged-supply-kits': {
    category: 'Choosing a program',
    description:
      'Explore how pre-packaged supply kits can fit into your school’s back-to-school plans.'
  },
  'how-schools-in-our-program-turn-supplies-into-extra-resources-for-students': {
    category: 'Fundraising & school support',
    description:
      'See how a school supply program can support broader goals for your students and campus.'
  }
};

export function isSchoolResource(post: Pick<BlogPost, 'handle' | 'tags'>): boolean {
  return (
    Object.hasOwn(featuredResources, post.handle) ||
    (post.tags || []).some((tag) => tag.trim().toLowerCase() === 'school-resources')
  );
}

export function getResourceDetails(post: BlogPost) {
  return (
    featuredResources[post.handle] || {
      category: 'School & PTO guide',
      description: post.excerpt || 'Practical guidance for your school supply program.'
    }
  );
}
