import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { CategorySection } from '@/components/category';
import { HeroBanner } from '@/components/home/hero-banner';
import { BrandLogo } from '@/components/home/logo';
import { SearchIcon } from '@/components/home/search-icon';
import { ProductSection } from '@/components/product';
import { ScreenState } from '@/components/screen-state';
import { BrandColors } from '@/constants/theme';
import { useHomeProducts } from '@/hooks/product';

export default function HomeScreen() {
  const { products, categories, isLoading, error, refetch } = useHomeProducts();

  // On détermine que la page est vide s'il n'y a ni produits ni catégories
  const isPageEmpty = products.length === 0 && categories.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenState
        isLoading={isLoading}
        error={error}
        isEmpty={isPageEmpty} 
        loadingText="Chargement des produits..."
        errorText="Impossible de charger la page d’accueil."
        emptyText="La boutique est actuellement vide. Revenez plus tard !"
        onRetry={() => {
          void refetch();
        }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <BrandLogo showMark={true} />
            <Pressable
              style={styles.searchButton}
              accessibilityRole="button"
              onPress={() => router.push('/explore')}
            >
              <SearchIcon size={18} color={BrandColors.white} />
            </Pressable>
          </View>

          <HeroBanner onPress={() => router.push('/explore')} />

          <CategorySection categories={categories} />

          <ProductSection title="Tendances" products={products.slice(0, 4)} />
          <ProductSection title="Nouveautés" products={products.slice(4)} />
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  searchButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: BrandColors.charcoal,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
