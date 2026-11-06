import { FlatList, StyleSheet, Text, View } from 'react-native';
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
        isEmpty={products.length === 0}
        loadingText="Chargement de la boutique..."
        errorText="Impossible de charger les produits."
        emptyText="Aucun produit pour le moment."
        onRetry={() => {
          void refetch();
        }}
      >
        <FlatList
          data={products}
          // keyExtractor attend un texte : l'id de l'API est un nombre
          keyExtractor={(product) => String(product.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>Boutique</Text>
              {/* Nombre de produits chargés, pas le total du catalogue (l'API est paginée) */}
              <Text style={styles.subtitle}>{products.length} produits</Text>
            </View>
          }
          renderItem={({ item }) => <ProductCard product={item} />}
        />
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
  },
  header: {
    gap: 4,
    marginBottom: 18,
  },
  // Les deux cartes d'une rangée : une à chaque bord, l'espace au milieu.
  // L'espace vertical entre les rangées vient du marginBottom de ProductCard.
  row: {
    justifyContent: 'space-between',
  },
  // Pas de fontWeight avec une police personnalisée :
  // utilise une version grasse de BrandFonts si elle existe.
  title: {
    color: BrandColors.charcoal,
    fontSize: 30,
    fontFamily: BrandFonts.display,
  },
  subtitle: {
    color: BrandColors.slate,
    fontSize: 14,
    fontFamily: BrandFonts.body,
  },
});