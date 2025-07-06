interface BlogPostStructuredDataProps {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  url: string;
  imageUrl?: string;
  tags: string[];
  readingTime: number;
}

interface WebsiteStructuredDataProps {
  name: string;
  description: string;
  url: string;
  author: string;
}

export function BlogPostStructuredData({
  title,
  description,
  author,
  publishedDate,
  modifiedDate,
  url,
  imageUrl,
  tags,
  readingTime,
}: BlogPostStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://harryyu.dev/about',
    },
    publisher: {
      '@type': 'Person',
      name: 'Harry Yu',
      url: 'https://harryyu.dev',
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url: url,
    image: imageUrl || 'https://harryyu.dev/images/og-image.jpg',
    keywords: tags.join(', '),
    wordCount: Math.round(readingTime * 200), // Rough estimate
    timeRequired: `PT${readingTime}M`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData({ name, description, url, author }: WebsiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: name,
    description: description,
    url: url,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://harryyu.dev/about',
    },
    publisher: {
      '@type': 'Person',
      name: 'Harry Yu',
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function PersonStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Harry Yu',
    alternateName: 'Shiyi Yu',
    description: 'Computer Science graduate, Software Developer, and tech enthusiast',
    url: 'https://harryyu.dev',
    image: 'https://harryyu.dev/images/profile.jpg',
    sameAs: [
      'https://github.com/handsomeharry',
      'https://www.linkedin.com/in/shiyi-yu-b6a542208/',
      'https://ai.harryyu.dev',
    ],
    jobTitle: 'Software Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'REON Technology Inc.',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Brandeis University',
    },
    knowsAbout: [
      'Software Development',
      'Web Development',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Python',
      'Computer Science',
      '3D Printing',
      'AI/ML',
    ],
    email: 'harryyu2002@gmail.com',
    birthPlace: 'Beijing, China',
    nationality: 'Chinese',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}