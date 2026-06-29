/**
 * Static project data — fallback for when KibanCMS is not configured.
 * Structure mirrors the Kiban 'projetos' collection schema.
 */

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  location: string;
  area: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  featured: boolean;
}

export const CATEGORIES = [
  'Todos',
  'Residencial',
  'Renovação',
  'Comercial',
  'Interiores',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Casa na Comporta',
    slug: 'casa-na-comporta',
    category: 'Residencial',
    year: '2024',
    location: 'Comporta, Setúbal',
    area: '320 m²',
    description:
      'Uma moradia contemporânea que se dissolve na paisagem dunar da Comporta. O projecto explora a relação entre a arquitectura e a natureza envolvente, com grandes vãos que emolduram o pinhal e o arrozal. Materiais locais — madeira de pinho tratada e betão branco — criam um diálogo subtil entre o construído e o natural.',
    thumbnail:
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: '2',
    title: 'Apartamento Chiado',
    slug: 'apartamento-chiado',
    category: 'Renovação',
    year: '2023',
    location: 'Chiado, Lisboa',
    area: '145 m²',
    description:
      'Renovação integral de um apartamento pombalino no coração do Chiado. O projecto preserva os elementos originais — estuques, soalho de pinho e azulejos — integrando-os numa linguagem contemporânea. A cozinha abre-se para a sala através de um arco restaurado, criando uma continuidade espacial luminosa.',
    thumbnail:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: false,
  },
  {
    id: '3',
    title: 'Escritório LX Factory',
    slug: 'escritorio-lx-factory',
    category: 'Comercial',
    year: '2024',
    location: 'Alcântara, Lisboa',
    area: '280 m²',
    description:
      'Espaço de coworking inserido num antigo armazém industrial da LX Factory. O projecto mantém a estrutura metálica original e o betão aparente, adicionando volumes em madeira que definem áreas de trabalho privadas. A iluminação zenital existente foi complementada com um sistema LED que acompanha o ritmo circadiano.',
    thumbnail:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: '4',
    title: 'Villa Algarve',
    slug: 'villa-algarve',
    category: 'Residencial',
    year: '2022',
    location: 'Tavira, Algarve',
    area: '450 m²',
    description:
      'Moradia unifamiliar com vista sobre a Ria Formosa. O volume branco e puro da tradição algarvia é reinterpretado com terraços escalonados e pátios interiores que captam a brisa marítima. A piscina infinita funde-se visualmente com o horizonte aquático.',
    thumbnail:
      'https://images.unsplash.com/photo-1621293954908-9271256abe97?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1621293954908-9271256abe97?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: false,
  },
  {
    id: '5',
    title: 'Loft Príncipe Real',
    slug: 'loft-principe-real',
    category: 'Interiores',
    year: '2024',
    location: 'Príncipe Real, Lisboa',
    area: '95 m²',
    description:
      'Transformação de um espaço comercial num loft residencial. O pé-direito duplo permitiu criar um mezanino em aço e vidro que funciona como suite. Ao nível térreo, a cozinha e a sala partilham um volume contínuo onde a luz zenital desenha padrões ao longo do dia.',
    thumbnail:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: '6',
    title: 'Clínica Avenida',
    slug: 'clinica-avenida',
    category: 'Comercial',
    year: '2023',
    location: 'Av. da Liberdade, Lisboa',
    area: '210 m²',
    description:
      'Clínica dentária de referência na Avenida da Liberdade. O design evoca serenidade através de superfícies curvas em microcimento, iluminação indireta e uma paleta de materiais naturais. Cada gabinete é pensado como um refúgio onde a ansiedade se dissipa.',
    thumbnail:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: false,
  },
  {
    id: '7',
    title: 'Palacete Estrela',
    slug: 'palacete-estrela',
    category: 'Renovação',
    year: '2024',
    location: 'Estrela, Lisboa',
    area: '680 m²',
    description:
      'Reabilitação de um palacete do séc. XIX para uso misto — residências no piso superior e galeria de arte no rés-do-chão. O projecto equilibra a preservação patrimonial com intervenções cirúrgicas em aço corten e vidro, marcando claramente o novo sobre o antigo.',
    thumbnail:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: '8',
    title: 'Casa Meco',
    slug: 'casa-meco',
    category: 'Residencial',
    year: '2023',
    location: 'Aldeia do Meco, Sesimbra',
    area: '180 m²',
    description:
      'Casa de férias junto à praia do Meco. Dois volumes paralelos em betão e madeira definem um pátio protegido do vento, orientado a sul. A cobertura ajardinada integra a casa na paisagem quando vista do alto da falésia.',
    thumbnail:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: false,
  },
];
