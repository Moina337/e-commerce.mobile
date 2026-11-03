import { StyleSheet, Text, View } from 'react-native';

import { BrandColors, BrandFonts } from '@/constants/theme';
import type { Product } from '@/data/products.mock';

import { ProductCard } from './product-card';

type ProductSectionProps = {
  title: string;
  products: Product[];
};

export function ProductSection({ title, products }: ProductSectionProps) {
  if (!products.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionLink}>Voir tout</Text>
      </View>

      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    color: BrandColors.charcoal,
    fontSize: 22,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  sectionLink: {
    color: BrandColors.copper,
    fontSize: 12,
    fontFamily: BrandFonts.body,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
});
