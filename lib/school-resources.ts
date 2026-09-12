import type { BlogPost } from 'lib/shopify/types';

// The approved launch collection also works before category navigation is deployed.
const launchHandles = new Set([
  'choose-school-supply-kit-company-houston',
  'texas-school-supply-program-planning-timeline',
  'school-supply-kit-fundraising-pto-questions',
  'how-schoolkits-school-partnership-works'
]);

const featuredResources: Record<string, { category: string; description: string }> = {
  'choose-school-supply-kit-company-houston': {
    category: 'Choosing a provider',
    description:
      'Compare teacher-list accuracy, pricing, responsibilities, delivery, and school proceeds.'
  },
  'texas-school-supply-program-planning-timeline': {
    category: 'Planning your program',
    description:
      'Work backward from delivery day to plan approvals, family ordering, and campus coordination.'
  },
  'school-supply-kit-fundraising-pto-questions': {
    category: 'Fundraising questions',
    description:
      'Clarify family pricing, how school proceeds are calculated, and what your PTO needs to plan.'
  },
  'how-schoolkits-school-partnership-works': {
    category: 'Working with SchoolKits',
    description:
      'See how supply lists become grade-level kits, from your first conversation through school delivery.'
  },
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
  return Object.hasOwn(featuredResources, post.handle) || isFeaturedSchoolResource(post);
}

export function isFeaturedSchoolResource(post: Pick<BlogPost, 'handle' | 'tags'>): boolean {
  return (
    launchHandles.has(post.handle) ||
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
