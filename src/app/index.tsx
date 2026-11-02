import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    backgroundColor: '#F5F6FA',
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
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 34,
  },
  avatarButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#6B7280',
  },
  searchText: {
    color: '#6B7280',
    fontSize: 15,
  },
  heroCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111827',
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
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 14,
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
    color: '#111827',
    fontSize: 20,
    fontWeight: '800',
  },
  sectionLink: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '700',
  },
  categoryRow: {
    paddingRight: 4,
    gap: 12,
  },
  categoryCard: {
    width: 90,
    height: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryName: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '600',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EEF2F7',
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
  },
  productName: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  productPrice: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
  },
  promoBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  promoTitle: {
    color: '#312E81',
    fontSize: 18,
    fontWeight: '800',
  },
  promoText: {
    color: '#4338CA',
    fontSize: 12,
    marginTop: 4,
  },
  promoBadge: {
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
});
