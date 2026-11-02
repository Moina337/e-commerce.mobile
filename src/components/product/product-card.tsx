import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandColors, BrandFonts } from '@/constants/theme';
import type { Product } from '@/data/products.mock';

type ProductCardProps = {
  product: Product;
  onPress?: (product: Product) => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  const firstImage = product.images[0]?.url ?? '';
  const price = `${product.price.toLocaleString('fr-FR')} FCFA`;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress?.(product)}
      style={styles.card}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: firstImage.startsWith('/api/') ? `https://example.com${firstImage}` : firstImage }}
          style={styles.image}
          resizeMode="cover"
        />

        <Pressable accessibilityRole="button" style={styles.favoriteButton}>
          <Text style={styles.favoriteText}>♡</Text>
        </Pressable>
      </View>

      <Text style={styles.category}>{product.category?.name ?? 'Produit'}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{price}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: BrandColors.line,
    shadowColor: BrandColors.black,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: BrandColors.stone,
  },
  image: {
    width: '100%',
    height: 170,
    backgroundColor: BrandColors.stone,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 16,
    color: BrandColors.charcoal,
  },
  category: {
    fontSize: 10,
    color: BrandColors.slate,
    marginTop: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: BrandFonts.body,
  },
  name: {
    fontSize: 14,
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.display,
    lineHeight: 18,
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    color: BrandColors.copper,
    fontFamily: BrandFonts.display,
  },
});
