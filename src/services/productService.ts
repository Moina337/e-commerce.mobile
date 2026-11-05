
import {
  mockApiResponse,
  mockCategories,
  mockHomeProducts,
  mockImages,
  type Product,
  type ProductCategory,
  type ProductImage,
} from '@/data/products.mock';

export const API_BASE_URL =
  'https://ecommerce-api-1eu4.onrender.com/api';

/**
 * Résout l'URL d'une image.
 * - Cloudinary : conserve l'URL HTTPS.
 * - Ancienne image locale : utilise l'API Spring Boot.
 */
export const resolveImageUrl = (imageUrl?: string): string => {
  if (!imageUrl?.trim()) {
    return '';
  }

  const url = imageUrl.trim();

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

/**
 * Normalise les produits reçus de Spring Boot.
 */
const normalizeProducts = (payload: unknown): Product[] => {
  let products: Product[] = [];

  if (Array.isArray(payload)) {
    products = payload as Product[];
  } else if (
    payload &&
    typeof payload === 'object' &&
    'content' in payload
  ) {
    const content = (payload as { content?: unknown }).content;

    if (Array.isArray(content)) {
      products = content as Product[];
    }
  }

  return products.map((product) => ({
    ...product,
    images: (product.images ?? []).map((image) => ({
      ...image,
      url: resolveImageUrl(image.url),
    })),
  }));
};

/**
 * Effectue une requête HTTP et retourne le JSON.
 */
const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Erreur HTTP ${response.status} : impossible de récupérer les données.`
    );
  }

  return (await response.json()) as T;
};

export const productService = {
  /**
   * Produits de la page d'accueil.
   */
  async getHomeProducts(): Promise<Product[]> {
    try {
      const response = await fetchJson<unknown>(
        `${API_BASE_URL}/products?page=0&size=8`
      );

      return normalizeProducts(response);
    } catch (error) {
      console.error('Erreur récupération produits accueil :', error);
      return normalizeProducts(mockHomeProducts);
    }
  },

  /**
   * Toutes les catégories.
   */
  async getAllCategories(): Promise<ProductCategory[]> {
    try {
      return await fetchJson<ProductCategory[]>(
        `${API_BASE_URL}/categories`
      );
    } catch (error) {
      console.error('Erreur récupération catégories :', error);
      return mockCategories;
    }
  },

  /**
   * Produits paginés.
   */
  async getAllProducts(
    page = 0,
    size = 100
  ): Promise<Product[]> {
    try {
      const response = await fetchJson<unknown>(
        `${API_BASE_URL}/products?page=${page}&size=${size}`
      );

      return normalizeProducts(response);
    } catch (error) {
      console.error('Erreur récupération produits :', error);
      return normalizeProducts(mockApiResponse.content);
    }
  },

  /**
   * Images mockées.
   */
  async getAllImages(): Promise<ProductImage[]> {
    return mockImages.map((image) => ({
      ...image,
      url: resolveImageUrl(image.url),
    }));
  },

  /**
   * Recherche une image par identifiant.
   */
  async getImageById(
    id: number
  ): Promise<ProductImage | undefined> {
    const image = mockImages.find(
      (item: ProductImage) => item.id === id
    );

    if (!image) {
      return undefined;
    }

    return {
      ...image,
      url: resolveImageUrl(image.url),
    };
  },

  /**
   * Recherche un produit par slug
   */
  async getProductBySlug(
    slug: string
  ): Promise<Product | undefined> {
    const products = await this.getAllProducts();

    return products.find((item: Product) => item.slug === slug);
  },

  /**
   * Retourne l'URL d'une image.
   */
  async getImageContent(id: number): Promise<string> {
    const image = await this.getImageById(id);

    return image?.url ?? '';
  },
};

export default productService;
