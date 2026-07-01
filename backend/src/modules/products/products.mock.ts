import type { Product } from './product.types';

export const productsMock: Product[] = [
  {
    id: 'prod_ebook_vue',
    name: 'Vue 3 Mastery E-book',
    price: 29,
    shortDescription: 'A practical Vue 3 guide focused on Composition API and TypeScript.',
    longDescription:
      'Learn how to build scalable Vue 3 applications using Composition API, TypeScript, Vue Router, Pinia, and clean component architecture.',
    thumbnailUrl: 'https://placehold.co/600x400?text=Vue+Ebook',
    category: 'ebook',
    reviews: [
      {
        id: 'rev_1',
        author: 'Daniel',
        rating: 5,
        comment: 'Clear, practical, and straight to the point.',
        createdAt: '2026-01-10T10:00:00.000Z',
      },
      {
        id: 'rev_2',
        author: 'Maya',
        rating: 4,
        comment: 'Great explanations of Composition API patterns.',
        createdAt: '2026-02-01T14:30:00.000Z',
      },
    ],
  },
  {
    id: 'prod_course_ts',
    name: 'TypeScript for Frontend Developers',
    price: 79,
    shortDescription: 'An online course for writing safer frontend applications.',
    longDescription:
      'A complete practical course that teaches TypeScript through real frontend examples, API contracts, stores, reusable utilities, and typed components.',
    thumbnailUrl: 'https://placehold.co/600x400?text=TypeScript+Course',
    category: 'online-course',
    reviews: [
      {
        id: 'rev_3',
        author: 'Noam',
        rating: 5,
        comment: 'Helped me write much cleaner application code.',
        createdAt: '2026-03-04T09:15:00.000Z',
      },
    ],
  },
  {
    id: 'prod_license_design',
    name: 'Design Assets Pro License',
    price: 49,
    shortDescription: 'A commercial license for premium design assets.',
    longDescription:
      'Use high-quality icons, illustrations, UI kits, and templates in commercial projects with a simple one-time license.',
    thumbnailUrl: 'https://placehold.co/600x400?text=Design+License',
    category: 'software-license',
    reviews: [
      {
        id: 'rev_4',
        author: 'Shani',
        rating: 4,
        comment: 'Good value for small client projects.',
        createdAt: '2026-03-21T12:45:00.000Z',
      },
    ],
  },
  {
    id: 'prod_template_saas',
    name: 'SaaS Landing Page Template',
    price: 39,
    shortDescription: 'A responsive landing page template for SaaS products.',
    longDescription:
      'A clean landing page template with hero, pricing, testimonials, FAQ, and call-to-action sections. Designed for fast customization.',
    thumbnailUrl: 'https://placehold.co/600x400?text=SaaS+Template',
    category: 'template',
    reviews: [
      {
        id: 'rev_5',
        author: 'Ariel',
        rating: 5,
        comment: 'Saved me a lot of time on a client demo.',
        createdAt: '2026-04-02T16:20:00.000Z',
      },
    ],
  },
  {
    id: 'prod_course_node',
    name: 'Node.js API Architecture Course',
    price: 89,
    shortDescription: 'Build maintainable REST APIs with Node.js, Express, and TypeScript.',
    longDescription:
      'Learn how to structure backend projects using routes, controllers, services, middleware, typed errors, logging, and clean REST API responses.',
    thumbnailUrl: 'https://placehold.co/600x400?text=Node+API+Course',
    category: 'online-course',
    reviews: [
      {
        id: 'rev_6',
        author: 'Lior',
        rating: 5,
        comment: 'The architecture section was exactly what I needed.',
        createdAt: '2026-04-17T08:00:00.000Z',
      },
    ],
  },
];
