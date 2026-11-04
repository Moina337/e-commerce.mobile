import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandColors, BrandFonts } from '@/constants/theme';
import type { ProductCategory } from '@/data/products.mock';

type CategorySectionProps = {
  categories: ProductCategory[];
};

export function CategorySection({ categories }: CategorySectionProps) {
  if (!categories.length) {
    return null;
  }

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Catégories</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {categories.map((category) => (
          <Pressable key={category.id} style={styles.categoryCard} accessibilityRole="button">
            <Text style={styles.categoryName}>{category.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  sectionTitle: {
    color: BrandColors.charcoal,
    fontSize: 20,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  categoryRow: {
    paddingRight: 6,
    gap: 10,
    paddingBottom: 4,
  },
  categoryCard: {
    width: 94,
    height: 78,
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BrandColors.line,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  categoryName: {
    color: BrandColors.charcoal,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: BrandFonts.body,
    textAlign: 'center',
  },
});
