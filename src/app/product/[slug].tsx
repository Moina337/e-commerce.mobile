import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddToCartButton } from '@/components/add-to-cart-button';
import { ScreenState } from '@/components/screen-state';
import { BrandColors, BrandFonts } from '@/constants/theme';
import { useProductBySlug } from '@/hooks/product';
import { resolveImageUrl } from '@/services/productService';

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const productSlug = typeof slug === 'string' ? slug : undefined;
  const { product, isLoading, error, refetch } = useProductBySlug(productSlug);
  const galleryImages = product?.images?.length ? product.images : [];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const activeImage =
    selectedImage && galleryImages.some((image) => image.url === selectedImage)
      ? selectedImage
      : galleryImages[0]?.url ?? null;

  return (
    <>
      <Stack.Screen
        options={{
          title: product?.name ?? 'Produit',
          headerBackTitle: 'Retour',
          headerTitleStyle: {
            fontFamily: BrandFonts.display,
            fontSize: 20,
            color: BrandColors.charcoal,
          },
          headerStyle: {
            backgroundColor: BrandColors.stone,
          },
          headerTintColor: BrandColors.charcoal,
        }}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScreenState
        isLoading={isLoading}
        error={error}
        isEmpty={!product}
        loadingText="Chargement du produit..."
        errorText="Impossible de charger ce produit."
        emptyText="Ce produit est introuvable."
        onRetry={() => {
          void refetch();
        }}
      >
        {product ? (
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
          

            <View style={styles.galleryWrapper}>
              {/* 1. Affichage de la grande image principale sélectionnée */}
              {galleryImages.length > 0 && activeImage ? (
                <Image
                  source={{ uri: resolveImageUrl(activeImage) }}
                  style={styles.mainImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.emptyGallery}>
                  <Text style={styles.emptyGalleryText}>Aucune image</Text>
                </View>
              )}

              {/* 2. Liste horizontale des miniatures (Thumbnails) cliquables */}
              {galleryImages.length > 1 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbnailList}
                >
                  {galleryImages.map((image) => {
                    const isSelected = activeImage === image.url;
                    return (
                      <Pressable
                        key={image.id}
                        onPress={() => setSelectedImage(image.url)}
                        style={[
                          styles.thumbnailWrapper,
                          isSelected && styles.thumbnailWrapperActive,
                        ]}
                      >
                        <Image
                          source={{ uri: resolveImageUrl(image.url) }}
                          style={[
                            styles.thumbnailImage,
                            isSelected ? styles.thumbnailImageActive : styles.thumbnailImageInactive,
                          ]}
                          resizeMode="cover"
                        />
                      </Pressable>
                    );
                  })}
                </ScrollView>
              ) : null}
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.category}>{product.category?.name ?? 'Produit'}</Text>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>{product.price.toLocaleString('fr-FR')} FCFA</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>

            <AddToCartButton product={product} />
          </ScrollView>
        ) : null}
        </ScreenState>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BrandColors.stone,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 18,
  },
  galleryWrapper: {
    gap: 12,
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: 340,
    borderRadius: 24,
    backgroundColor: BrandColors.stone,
  },
  thumbnailList: {
    gap: 10,
    paddingVertical: 4,
  },
  thumbnailWrapper: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbnailWrapperActive: {
    borderColor: BrandColors.copper, // Bordure de focus (utilisation de la couleur de votre charte)
  },
  thumbnailImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  thumbnailImageActive: {
    opacity: 1,
  },
  thumbnailImageInactive: {
    opacity: 0.6, // Assombrit légèrement les images non sélectionnées
  },
  emptyGallery: {
    width: '100%',
    height: 340,
    borderRadius: 24,
    backgroundColor: BrandColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BrandColors.line,
  },
  emptyGalleryText: {
    color: BrandColors.slate,
    fontSize: 13,
    fontFamily: BrandFonts.body,
  },
  infoBlock: {
    gap: 8,
    paddingBottom: 4,
  },
  category: {
    color: BrandColors.slate,
    fontSize: 11,
    fontFamily: BrandFonts.body,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    color: BrandColors.charcoal,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    fontFamily: BrandFonts.display,
  },
  price: {
    color: BrandColors.copper,
    fontSize: 22,
    fontWeight: '700',
    fontFamily: BrandFonts.display,
  },
  description: {
    color: BrandColors.charcoal,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: BrandFonts.body,
  },
  addToCartButton: {
    marginTop: 4,
    backgroundColor: BrandColors.charcoal,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: BrandColors.white,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: BrandFonts.body,
  },
});