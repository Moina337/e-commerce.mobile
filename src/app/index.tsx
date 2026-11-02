import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandColors, BrandFonts } from '@/constants/theme';

const categories = [
  { name: 'Mode', icon: '👗' },
  { name: 'Tech', icon: '📱' },
  { name: 'Maison', icon: '🛋️' },
  { name: 'Beauté', icon: '💄' },
  { name: 'Sport', icon: '🏃' },
];

const trendingProducts = [
  {
    name: 'Air Max Pro',
    price: '€149',
    tag: 'Nouveau',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Montre Luxe',
    price: '€249',
    tag: 'Top vente',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Sac Juno',
    price: '€189',
    tag: 'Promo',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Casque Audio',
    price: '€89',
    tag: 'Populaire',
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.greeting}>Bonjour, Max</Text>
            <Text style={styles.title}>Trouve ton prochain coup de cœur</Text>
          </View>

          <Pressable style={styles.avatarButton} accessibilityRole="button">
            <Text style={styles.avatarText}>M</Text>
          </Pressable>
        </View>

        <Pressable style={styles.searchBar} accessibilityRole="button">
          <Text style={styles.searchIcon}>⌕</Text>
          <Text style={styles.searchText}>Rechercher un produit...</Text>
        </Pressable>

        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>Promo du jour</Text>
            <Text style={styles.heroTitle}>Jusqu&apos;à 50% de réduction</Text>
            <Text style={styles.heroSubtitle}>
              Sur les nouvelles collections élégantes et essentials du moment.
            </Text>

            <Pressable style={styles.primaryButton} accessibilityRole="button">
              <Text style={styles.primaryButtonText}>Acheter maintenant</Text>
            </Pressable>
          </View>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <Text style={styles.sectionLink}>Voir tout</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((category) => (
            <Pressable key={category.name} style={styles.categoryCard} accessibilityRole="button">
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tendances</Text>
          <Text style={styles.sectionLink}>Plus populaires</Text>
        </View>

        <View style={styles.productGrid}>
          {trendingProducts.map((product) => (
            <Pressable key={product.name} style={styles.productCard} accessibilityRole="button">
              <View style={styles.productImageWrapper}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productTag}>{product.tag}</Text>
              </View>

              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.promoBanner}>
          <View>
            <Text style={styles.promoTitle}>Livraison rapide</Text>
            <Text style={styles.promoText}>Commandes avant 20h, livré demain.</Text>
          </View>
          <Text style={styles.promoBadge}>Free</Text>
        </View>
      </ScrollView>
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
    paddingBottom: 32,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  headerTextBlock: {
    flex: 1,
  },
  greeting: {
    color: BrandColors.slate,
    fontSize: 14,
    marginBottom: 6,
    fontFamily: BrandFonts.body,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: BrandColors.charcoal,
    lineHeight: 34,
    fontFamily: BrandFonts.display,
  },
  avatarButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: BrandColors.charcoal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: BrandColors.white,
    fontWeight: '700',
    fontSize: 18,
    fontFamily: BrandFonts.display,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: BrandColors.white,
    borderWidth: 1,
    borderColor: BrandColors.line,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: BrandColors.slate,
  },
  searchText: {
    color: BrandColors.slate,
    fontSize: 15,
    fontFamily: BrandFonts.body,
  },
  heroCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BrandColors.charcoal,
    borderRadius: 24,
    padding: 18,
    overflow: 'hidden',
    minHeight: 180,
  },
  heroContent: {
    flex: 1,
    paddingRight: 12,
  },
  heroLabel: {
    color: BrandColors.sand,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 10,
    fontFamily: BrandFonts.display,
  },
  heroTitle: {
    color: BrandColors.white,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: 8,
    fontFamily: BrandFonts.display,
  },
  heroSubtitle: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: BrandFonts.body,
  },
  primaryButton: {
    backgroundColor: BrandColors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: BrandColors.charcoal,
    fontWeight: '700',
    fontSize: 14,
    fontFamily: BrandFonts.display,
  },
  heroImage: {
    width: 120,
    height: 140,
    borderRadius: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    color: BrandColors.charcoal,
    fontSize: 20,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  sectionLink: {
    color: BrandColors.copper,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: BrandFonts.display,
  },
  categoryRow: {
    paddingRight: 4,
    gap: 12,
  },
  categoryCard: {
    width: 90,
    height: 90,
    backgroundColor: BrandColors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BrandColors.line,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryName: {
    color: BrandColors.charcoal,
    fontSize: 13,
    fontWeight: '600',
    fontFamily: BrandFonts.body,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  productCard: {
    width: '48%',
    backgroundColor: BrandColors.white,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: BrandColors.softShadow,
  },
  productImageWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  productTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#E0F2FE',
    color: '#0369A1',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    fontFamily: BrandFonts.display,
  },
  productName: {
    color: BrandColors.charcoal,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    fontFamily: BrandFonts.display,
  },
  productPrice: {
    color: BrandColors.charcoal,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  promoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BrandColors.promo,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: BrandColors.promoBorder,
  },
  promoTitle: {
    color: '#312E81',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  promoText: {
    color: '#4338CA',
    fontSize: 12,
    marginTop: 4,
    fontFamily: BrandFonts.body,
  },
  promoBadge: {
    backgroundColor: BrandColors.copper,
    color: BrandColors.white,
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontFamily: BrandFonts.display,
  },
});
