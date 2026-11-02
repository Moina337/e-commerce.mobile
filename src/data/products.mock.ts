export type ProductImage = {
  id: number;
  originalFilename: string;
  contentType: string;
  size: number;
  url: string;
  createdAt: string;
};

export type ProductCategory = {
  id: number;
  name: string;
  slug: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: ProductImage[];
  category: ProductCategory;
};

export const mockImages: ProductImage[] = [
  {
    id: 3,
    originalFilename: '1.jpg',
    contentType: 'image/jpeg',
    size: 29741,
    url: '/api/images/3/content',
    createdAt: '2026-10-30T22:55:21.883442',
  },
  {
    id: 5,
    originalFilename: '6.jpg',
    contentType: 'image/jpeg',
    size: 46649,
    url: '/api/images/5/content',
    createdAt: '2026-10-30T22:57:44.377945',
  },
  {
    id: 7,
    originalFilename: '3.jpg',
    contentType: 'image/jpeg',
    size: 83724,
    url: '/api/images/7/content',
    createdAt: '2026-10-30T22:59:55.281858',
  },
  {
    id: 9,
    originalFilename: '9.jpg',
    contentType: 'image/jpeg',
    size: 95863,
    url: '/api/images/9/content',
    createdAt: '2026-10-30T23:01:25.511832',
  },
  {
    id: 8,
    originalFilename: '5.jpg',
    contentType: 'image/jpeg',
    size: 52778,
    url: '/api/images/8/content',
    createdAt: '2026-10-30T23:00:58.781268',
  },
  {
    id: 10,
    originalFilename: '7.jpg',
    contentType: 'image/jpeg',
    size: 42436,
    url: '/api/images/10/content',
    createdAt: '2026-10-30T23:02:42.683685',
  },
  {
    id: 11,
    originalFilename: '8.jpg',
    contentType: 'image/jpeg',
    size: 45136,
    url: '/api/images/11/content',
    createdAt: '2026-10-30T23:02:42.994714',
  },
  {
    id: 6,
    originalFilename: '4.jpg',
    contentType: 'image/jpeg',
    size: 54439,
    url: '/api/images/6/content',
    createdAt: '2026-10-30T22:58:05.38943',
  },
  {
    id: 12,
    originalFilename: '2.jpg',
    contentType: 'image/jpeg',
    size: 50214,
    url: '/api/images/12/content',
    createdAt: '2026-10-31T00:04:18.145118',
  },
  {
    id: 13,
    originalFilename: '10.jpg',
    contentType: 'image/jpeg',
    size: 61184,
    url: '/api/images/13/content',
    createdAt: '2026-10-31T00:05:52.221095',
  },
];

export const mockCategories: ProductCategory[] = [
  { id: 1, name: 'Sneakers & Baskets Mode', slug: 'sneakers-baskets-mode' },
  { id: 2, name: 'Chaussures Habillées & Ville', slug: 'chaussures-habillees-ville' },
  { id: 3, name: 'Chaussures de Sport & Running', slug: 'chaussures-de-sport-running' },
  { id: 4, name: 'Sandales & Slides', slug: 'sandales-slides' },
];

const getImageById = (imageId: number): ProductImage => {
  return mockImages.find((image) => image.id === imageId) ?? mockImages[0];
};

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Air Force 1 White',
    slug: 'air-force-1-white',
    description:
      'Une silhouette minimaliste et intemporelle. Conçue en toile de coton respirante avec une semelle cuvette blanche contrastante, cette basket est idéale pour un look décontracté au quotidien.',
    price: 15000,
    images: [getImageById(3)],
    category: mockCategories[0],
  },
  {
    id: 2,
    name: 'Nike Air Force 1 Low - Colorblock Noir, Blanc & Gris',
    slug: 'nike-air-force-1-low-colorblock-noir-blanc-gris',
    description:
      'Une déclinaison moderne de la classique AF1. Ce modèle propose un contraste saisissant grâce à ses empiècements en cuir coloré, apportant une touche dynamique et graphique à toutes vos tenues urbaines.',
    price: 25000,
    images: [getImageById(6)],
    category: mockCategories[0],
  },
  {
    id: 3,
    name: 'Nike Air Force 1 Low Suede Grey',
    slug: 'nike-air-force-1-low-suede-grey',
    description:
      'Un style premium aux accents texturés. Alliant du daim doux gris et des empiècements en cuir noir, cette version se distingue par sa semelle extérieure en gomme orange qui offre une excellente adhérence et une allure rétro unique.',
    price: 15000,
    images: [getImageById(5)],
    category: mockCategories[0],
  },
  {
    id: 4,
    name: 'New Balance 530 White/Silver',
    slug: 'new-balance-530-white-silver',
    description:
      "Le retour du design running des années 2000. Dotée d'une empeigne en mesh aéré et de superpositions synthétiques argentées, elle intègre la technologie d'amorti ABZORB pour absorber les chocs à chaque pas avec un style rétro-running inégalé.",
    price: 35000,
    images: [getImageById(7), getImageById(9)],
    category: mockCategories[2],
  },
  {
    id: 5,
    name: 'Nike Air Max Plus (TN) Gradient Grey',
    slug: 'nike-air-max-plus-tn-gradient-grey',
    description:
      "L'esprit \"Tuned Air\" à l'état pur. Arborant ses célèbres cages de maintien en TPU inspirées des palmiers et un mesh respirant en dégradé de gris, cette basket offre une stabilité optimale et un amorti dynamique rebondissant.",
    price: 23000,
    images: [getImageById(8)],
    category: mockCategories[2],
  },
  {
    id: 6,
    name: 'Carlos Santos Chukka Boots',
    slug: 'carlos-santos-chukka-boots',
    description:
      "L'excellence de la cordonnerie artisanale. Ces bottines habillées à trois œillets présentent un cuir de veau lisse avec une patine ombrée faite à la main, offrant un profil élégant parfait avec un costume ou un chino chic.",
    price: 12000,
    images: [getImageById(10), getImageById(11)],
    category: mockCategories[1],
  },
  {
    id: 7,
    name: 'Adidas Superstar Core Black',
    slug: 'adidas-superstar-core-black',
    description:
      'Légende du streetwear, la Superstar revisite le look classic avec une palette noir et blanc ultra premium et un confort de bureau à la ville.',
    price: 18000,
    images: [mockImages[8]],
    category: mockCategories[0],
  },
  {
    id: 8,
    name: 'Puma RS-X Bold',
    slug: 'puma-rs-x-bold',
    description:
      'Un hommage au running des années 2000 avec une silhouette généreuse, des détails technique et une énergie visuelle parfaite pour la ville.',
    price: 22000,
    images: [mockImages[9]],
    category: mockCategories[2],
  },
];

export const mockHomeProducts = mockProducts.slice(0, 8);

export const mockApiResponse = {
  content: mockProducts,
  pageable: {
    pageNumber: 0,
    pageSize: 100,
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  totalElements: mockProducts.length,
  totalPages: 1,
  last: true,
  numberOfElements: mockProducts.length,
  size: 100,
  number: 0,
  sort: {
    unsorted: true,
    sorted: false,
    empty: true,
  },
  first: true,
  empty: false,
};
