export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  /** YYYY-MM format */
  date: string;
  /** Remove before launch — replace with real Google reviews */
  placeholder?: boolean;
}

// Populate with real reviews from Google Business before launch.
export const REVIEWS: Review[] = [
  {
    id: 'p1',
    author: 'Emilse Negretti',
    rating: 5,
    text: 'Exelente abogado muy humano y correcto super recomendable y confiable',
    date: '2025-12'
  },
  {
    id: 'p2',
    author: 'Gonzalo Pereyra',
    rating: 5,
    text: 'Excelente predisposición en todo momento, brindando apoyo y seguridad en la resolución del caso. Es destacable su calidad humana, su entusiasmo y pasión por lo que hace. Muy agradecido como siempre.',
    date: '2024-06'
  },
  {
    id: 'p3',
    author: 'Natalia Alonso',
    rating: 5,
    text: 'Muy claro y muy humano... cumplió con su trabajo en tiempo y forma. Un excelente abogado.',
    date: '2025-01'
  },
  {
    id: 'p4',
    author: 'Mailien Smit',
    rating: 5,
    text: 'Muy buen abogado, conmigo fue sincero y directo. Enseguida se puso a trabajar en mi caso. Muy recomendable.',
    date: '2022-08'
  },
  {
    id: 'p5',
    author: 'Luciano Villa',
    rating: 5,
    text: 'Eficiencia y transparencia, una grata experiencia con el Dr Mombello , acompaño mi caso de cerca y con muy buena predisposición. Lo recomiendo!',
    date: '2024-12'
  },
  {
    id: 'p6',
    author: 'Giovanna Gonzalez Noa',
    rating: 5,
    text: 'Excelente atención, concretó y directo, no duden!',
    date: '2025-02'
  },
  {
    id: 'p7',
    author: 'Mario Roberto Moreno',
    rating: 5,
    text: 'El mejor ABOGADO de Gral. Pacheco. Sin lugar a dudas. Directo, concreto, sin verso.',
    date: '2026-02'
  },
  {
    id: 'p8',
    author: 'Miguel Angel Troilo',
    rating: 5,
    text: 'Por lejos el mejor abogado de Pacheco. Un capo. Me salvo...!!!',
    date: '2025-06'
  },
];
