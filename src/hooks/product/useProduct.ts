import { useCallback, useEffect, useState } from 'react';

import type { Product, ProductCategory } from '@/data/products.mock';
import productService from '@/services/productService';

export function useHomeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHomeProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [productsData, categoriesData] = await Promise.all([
        productService.getHomeProducts(),
        productService.getAllCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger les produits et catégories.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadHomeProducts();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadHomeProducts]);

  return {
    products,
    categories,
    isLoading,
    error,
    refetch: loadHomeProducts,
  };
}

export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const productsData = await productService.getAllProducts();
      setProducts(productsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger les produits.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: loadProducts,
  };
}

export function useProduct({ productType = 'all' }: { productType?: 'all' | 'featured' | 'new' } = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const productsData = productType === 'all'
        ? await productService.getAllProducts()
        : await productService.getHomeProducts();

      setProducts(productsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger les produits.');
    } finally {
      setIsLoading(false);
    }
  }, [productType]);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: loadProducts,
  };
}
// recherge par slug 
export function useProductBySlug(productSlug?: string) {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(Boolean(productSlug));
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    if (!productSlug) {
      setProduct(undefined);
      setError(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const productData = await productService.getProductBySlug(productSlug);
      setProduct(productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger le produit.');
    } finally {
      setIsLoading(false);
    }
  }, [productSlug]);

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
