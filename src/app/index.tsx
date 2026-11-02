import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroBanner } from '@/components/home/hero-banner';
import { BrandLogo } from '@/components/home/logo';
import { SearchIcon } from '@/components/home/search-icon';
import { BrandColors, BrandFonts } from '@/constants/theme';

const categories = [
  { name: 'Sneakers', icon: '👟' },
  { name: 'Homme', icon: '🧍' },
  { name: 'Femme', icon: '💃' },
  { name: 'Sport', icon: '🏃' },
  { name: 'Classique', icon: '🕶️' },
  { name: 'Sandales', icon: '🩴' },
  { name: 'Boots', icon: '🥾' },
];

const trends = [
  {
    brand: 'Nike',
    name: 'Air Max',
    price: '45 000 FCFA',
    oldPrice: '55 000 FCFA',
    tag: '-18%',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    brand: 'Adidas',
    name: 'Ultraboost',
    price: '52 000 FCFA',
    oldPrice: '63 000 FCFA',
    tag: '-20%',
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
  },
  {
    brand: 'New Balance',
    name: '530 Legacy',
    price: '48 000 FCFA',
    oldPrice: '58 000 FCFA',
    tag: '-17%',
    image:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
  },
  {
    brand: 'Puma',
    name: 'Velocity',
    price: '41 000 FCFA',
    oldPrice: '50 000 FCFA',
    tag: '-18%',
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
  },
];

const newArrivals = [
  {
    brand: 'Jordan',
    name: 'Jordan 1 Low',
    price: '60 000 FCFA',
    oldPrice: '70 000 FCFA',
    tag: 'Nouveau',
    image:
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=900&q=80',
  },
  {
    brand: 'Yeezy',
    name: 'Slide Core',
    price: '36 000 FCFA',
    oldPrice: '44 000 FCFA',
    tag: 'Promo',
    image:
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80',
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
          <BrandLogo showMark={true} />
          <Pressable
            style={styles.searchButton}
            accessibilityRole="button"
            onPress={() => router.push('/explore')}
          >
            <SearchIcon size={18} color={BrandColors.white} />
          </Pressable>
        </View>

        <HeroBanner
         
          onPress={() => router.push('/explore')}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Catégories</Text>
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
          <Text style={styles.sectionLink}>Voir tout</Text>
        </View>

        <View style={styles.productGrid}>
          {trends.map((product) => (
            <Pressable key={`${product.brand}-${product.name}`} style={styles.productCard} accessibilityRole="button">
              <View style={styles.productImageWrapper}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Pressable style={styles.favoriteButton} accessibilityRole="button">
                  <Text style={styles.favoriteButtonText}>♡</Text>
                </Pressable>
                <Text style={styles.productTag}>{product.tag}</Text>
              </View>

              <Text style={styles.productBrand}>{product.brand}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.oldPrice}>{product.oldPrice}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nouveautés</Text>
          <Text style={styles.sectionLink}>Voir tout</Text>
        </View>

        <View style={styles.productGrid}>
          {newArrivals.map((product) => (
            <Pressable key={`${product.brand}-${product.name}`} style={styles.productCard} accessibilityRole="button">
              <View style={styles.productImageWrapper}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Pressable style={styles.favoriteButton} accessibilityRole="button">
                  <Text style={styles.favoriteButtonText}>♡</Text>
                </Pressable>
                <Text style={styles.productTag}>{product.tag}</Text>
              </View>

              <Text style={styles.productBrand}>{product.brand}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.oldPrice}>{product.oldPrice}</Text>
              </View>
            </Pressable>
          ))}
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
    paddingBottom: 36,
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.display,
    letterSpacing: 0.5,
  },
  searchButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: BrandColors.charcoal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 18,
    overflow: 'hidden',
    minHeight: 170,
  },
  heroContent: {
    flex: 1,
    paddingRight: 12,
  },
  heroLabel: {
    color: '#F3D8AE',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
    fontFamily: BrandFonts.display,
  },
  heroTitle: {
    color: BrandColors.white,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 8,
    fontFamily: BrandFonts.display,
  },
  heroSubtitle: {
    color: '#D1D5DB',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
    fontFamily: BrandFonts.body,
  },
  primaryButton: {
    backgroundColor: '#F4E6D0',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: BrandColors.charcoal,
    fontWeight: '700',
    fontSize: 13,
    fontFamily: BrandFonts.display,
  },
  heroImage: {
    width: 120,
    height: 132,
    borderRadius: 18,
  },
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
  sectionLink: {
    color: BrandColors.copper,
    fontSize: 13,
    fontWeight: '700',
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
    gap: 6,
  },
  categoryIcon: {
    fontSize: 22,
  },
  categoryName: {
    color: BrandColors.charcoal,
    fontSize: 12,
    fontWeight: '700',
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
    height: 156,
    borderRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: BrandColors.charcoal,
    fontSize: 16,
    fontWeight: '700',
  },
  productTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#E0F2FE',
    color: '#0369A1',
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 999,
    fontFamily: BrandFonts.display,
  },
  productBrand: {
    color: BrandColors.slate,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
    fontFamily: BrandFonts.body,
  },
  productName: {
    color: BrandColors.charcoal,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    fontFamily: BrandFonts.display,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  productPrice: {
    color: BrandColors.charcoal,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  oldPrice: {
    color: BrandColors.slate,
    fontSize: 11,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    fontFamily: BrandFonts.body,
  },
});
