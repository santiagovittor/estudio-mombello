import {
  GOOGLE_BIZ_NAME,
  GOOGLE_BIZ_RATING,
  GOOGLE_BIZ_COUNT,
  PHONE_DISPLAY,
  YEARS_EXPERIENCE,
  OFFICE_ADDRESS,
} from './constants';

interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  telephone: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  url: string;
}

interface LegalServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  provider: { '@type': string; name: string };
  areaServed: string;
}

interface PersonSchema {
  '@context': string;
  '@type': string;
  name: string;
  jobTitle: string;
  alumniOf: { '@type': string; name: string };
  knowsAbout: string[];
  description: string;
}

interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: { '@type': string; name: string; acceptedAnswer: { '@type': string; text: string } }[];
}

interface AggregateRatingSchema {
  '@context': string;
  '@type': string;
  itemReviewed: { '@type': string; name: string };
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
}

export function getLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: GOOGLE_BIZ_NAME,
    telephone: PHONE_DISPLAY,
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE_ADDRESS,
      addressLocality: 'General Pacheco',
      addressRegion: 'Provincia de Buenos Aires',
      postalCode: 'B1617',
      addressCountry: 'AR',
    },
    url: '',
  };
}

export function getLegalServiceSchema(area: 'Penal' | 'Laboral' | 'Familia'): LegalServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Derecho ${area}`,
    provider: { '@type': 'LegalService', name: GOOGLE_BIZ_NAME },
    areaServed: 'Buenos Aires, Argentina',
  };
}

export function getPersonSchema(): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Fabio Mombello',
    jobTitle: 'Abogado',
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Abierta Interamericana' },
    knowsAbout: ['Derecho Penal', 'Derecho Laboral', 'Derecho de Familia'],
    description: `Abogado con ${YEARS_EXPERIENCE} años de experiencia en Buenos Aires.`,
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function getAggregateRatingSchema(): AggregateRatingSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: { '@type': 'LegalService', name: GOOGLE_BIZ_NAME },
    ratingValue: GOOGLE_BIZ_RATING,
    reviewCount: GOOGLE_BIZ_COUNT,
    bestRating: 5,
  };
}
