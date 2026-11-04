import {
  mockApiResponse,
  mockCategories,
  mockHomeProducts,
  mockImages,
  type Product,
  type ProductCategory,
  type ProductImage,
} from '../data/products.mock';

const API_BASE_URL = 'https://api.example.com';

export const productService = {
  async getHomeProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockHomeProducts), 300);
    });
  },

  async getAllCategories(): Promise<ProductCategory[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCategories), 250);
    });
  },

  async getAllProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockApiResponse.content as Product[]), 300);
    });
  },

  async getAllImages(): Promise<ProductImage[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockImages), 250);
    });
  },

  async getImageById(id: number): Promise<ProductImage | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const image = mockImages.find((item: ProductImage) => item.id === id);
        resolve(image);
      }, 200);
    });
  },

  async getProductById(id: number): Promise<Product | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockApiResponse.content.find((item: Product) => item.id === id) as Product | undefined;
        resolve(product);
      }, 200);
    });
  },

  async getImageContent(id: number): Promise<string> {
    const image = await this.getImageById(id);
    const imageUrl = image?.url ?? '/api/images/not-found/content';
    return imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}${imageUrl}`;
  },
};

export default productService;
