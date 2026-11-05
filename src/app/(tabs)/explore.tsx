import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductCard } from '@/components/product';
import { ScreenState } from '@/components/screen-state';
import { BrandColors, BrandFonts } from '@/constants/theme';
import { useProduct } from '@/hooks/product';

export default function ExploreScreen() {
  const { products, isLoading, error, refetch } = useProduct({ productType: 'all' });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenState
        isLoading={isLoading}
        error={error}
        loadingText="Chargement de la boutique..."
        errorText="Impossible de charger les produits."
        onRetry={() => {
          void refetch();
        }}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Boutique</Text>
            <Text style={styles.subtitle}>{products.length} produits</Text>
          </View>

          <View style={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </ScrollView>
      </ScreenState>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BrandColors.stone,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
    gap: 18,
  },
  header: {
    gap: 4,
  },
  title: {
    color: BrandColors.charcoal,
    fontSize: 30,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  subtitle: {
    color: BrandColors.slate,
    fontSize: 14,
    fontFamily: BrandFonts.body,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
});
