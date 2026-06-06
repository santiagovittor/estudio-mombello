import {
  SITE_URL,
  GOOGLE_BIZ_NAME,
  YEARS_EXPERIENCE,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
} from '@/lib/constants';

export function getStructuredData(): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': ['LegalService', 'LocalBusiness'],
      '@id': `${SITE_URL}/#estudio`,
      name: GOOGLE_BIZ_NAME,
      description:
        `Estudio jurídico especializado en derecho penal, laboral y de familia ` +
        `con ${YEARS_EXPERIENCE} años de experiencia en tribunales de Buenos Aires.`,
      url: SITE_URL,
      telephone: '+5491152579927',
      email: CONTACT_EMAIL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Guayaquil 390',
        addressLocality: 'General Pacheco',
        addressRegion: 'Buenos Aires',
        postalCode: 'B1617',
        addressCountry: 'AR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -34.4619,
        longitude: -58.6273,
      },
      areaServed: [
        { '@type': 'City', name: 'General Pacheco' },
        { '@type': 'City', name: 'Tigre' },
        { '@type': 'City', name: 'Buenos Aires' },
        { '@type': 'AdministrativeArea', name: 'Zona Norte del Gran Buenos Aires' },
      ],
      serviceType: ['Derecho Penal', 'Derecho Laboral', 'Derecho de Familia'],
      sameAs: [INSTAGRAM_URL],
      priceRange: '$$',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#fabio`,
      name: 'Fabio Mombello',
      honorificPrefix: 'Dr.',
      jobTitle: 'Abogado',
      description:
        `Abogado con ${YEARS_EXPERIENCE} años de experiencia en derecho penal, ` +
        'laboral y de familia en tribunales de Buenos Aires.',
      worksFor: { '@id': `${SITE_URL}/#estudio` },
      url: SITE_URL,
      telephone: '+5491152579927',
      email: CONTACT_EMAIL,
      sameAs: [INSTAGRAM_URL],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Recibí una citación de la fiscalía o la policía. ¿Qué hago primero?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No se presente solo. No declare ni firme nada antes de hablar con un abogado. Muchas personas van a "aclarar las cosas" y ese impulso empeora todo. Llámeme antes de presentarse: evaluamos juntos si corresponde ir a la comisaría o directamente al juzgado, lo que en muchos casos evita la detención preventiva.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Estoy obligado a declarar si me detienen o me citan como imputado?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Tiene derecho a guardar silencio y a declarar solo ante el juez, siempre con su abogado. Ejercer ese derecho no lo perjudica. Declarar solo, sin preparación, es uno de los errores más difíciles de corregir después. Si está detenido ahora, llámeme.',
          },
        },
        {
          '@type': 'Question',
          name: 'Me despidieron sin causa. ¿Vale la pena iniciar un reclamo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Depende del caso, y eso lo analizamos en la primera consulta. Lo que sí puedo decirle: en causas laborales trabajo con cuota litis, cobro un porcentaje de lo que se recupera. Si no hay resultado, no hay honorarios. El primer paso es la conciliación obligatoria, que en muchos casos resuelve sin llegar a juicio.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué pasa en la primera consulta?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Me cuenta qué pasó. Escucho, hago las preguntas necesarias, y al terminar usted sabe si tiene un caso viable, qué caminos existen y cuál es el paso concreto siguiente. Sin rodeos ni promesas vacías.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo son los honorarios?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'En causas laborales, los honorarios son un porcentaje de lo obtenido, sin costo inicial. Si el cliente no gana, el abogado no cobra. En causas penales y de familia, los honorarios se acuerdan en la primera consulta, una vez que entiendo bien su situación. El valor de la consulta inicial se lo informo al contactarse.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto tiempo tarda un caso como el mío?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Un divorcio de mutuo acuerdo suele resolverse en 1 a 3 meses. Un juicio laboral completo puede durar entre 1 y 4 años, aunque un caso bien planteado desde el inicio puede acortarse significativamente. Las causas penales varían según la etapa y el delito. Lo que sí controlo es que cada paso se dé a tiempo y sin demoras evitables.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Puedo hacer la consulta de forma remota?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Atiendo por videollamada o WhatsApp para la primera consulta. Cuando el caso requiere documentación o presencia en tribunales, le indico con anticipación qué necesita y cuándo.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Tiene experiencia en los tribunales de Buenos Aires?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Llevo 20 años ejerciendo en el fuero penal, laboral y de familia en tribunales de Buenos Aires. Conozco los tiempos, las costumbres procesales y a los operadores judiciales. Eso define cómo se planifica cada caso desde el primer día.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Dr. Fabio Mombello — Abogado',
      description: 'Estudio jurídico en General Pacheco. Penal, Laboral y Familia.',
    },
  ];
}
