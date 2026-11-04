import { useCallback, useEffect, useState } from 'react';

import type { Product, ProductCategory } from '@/data/products.mock';
import productService from '@/services/productService';

type UseProductOptions = {
  autoLoad?: boolean;
};

export function useProduct(options: UseProductOptions = {}) {
  const { autoLoad = true } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 💡 Attend 2 secondes avant de continuer le code
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    // Décommentez la ligne ci-dessous pour simuler une panne après 2 secondes :
     throw new Error("Le serveur ne répond pas.");

      const [productsData, categoriesData] = await Promise.all([
        productService.getHomeProducts(),
        productService.getAllCategories(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger les données.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) {
      void loadProducts();
    }
  }, [autoLoad, loadProducts]);

  return {
    products,
    categories,
    isLoading,
    error,
    refetch: loadProducts,
  };
}

export function useProductById(productId?: number) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(Boolean(productId));
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    if (!productId) {
      setProduct(undefined);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const productData = await productService.getProductById(productId);
      setProduct(productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger le produit.');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    void loadProduct();
  }, [loadProduct]);

  return {
    product,
    isLoading,
    error,
    refetch: loadProduct,
  };
}
