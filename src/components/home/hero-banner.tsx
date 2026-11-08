import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button/button';
import { BrandColors, BrandFonts } from '@/constants/theme';

type HeroBannerProps = {
  title?: string;
  ctaLabel?: string;
  onPress?: () => void;
  subtitle?: string;
  imageUri?: string;
};

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80';

const BASE_TINT = 0.2;
const GRADIENT_STEPS = [0, 0.04, 0.09, 0.15, 0.22, 0.3, 0.39, 0.48, 0.57, 0.66, 0.74, 0.8];

export function HeroBanner({
  title = 'Nouvelle collection',
  ctaLabel = 'Découvrir',
  onPress,
  subtitle,
  imageUri,
}: HeroBannerProps) {
  const [hasImageError, setHasImageError] = useState(false);

  // ✅ Réinitialise l'erreur si une nouvelle imageUri arrive depuis l'API
  useEffect(() => {
    setHasImageError(false);
  }, [imageUri]);

  const normalizedImageUri = (imageUri ?? '').trim();
  const useRemoteImage = normalizedImageUri.length > 0 && !hasImageError;

  const imageSource = useRemoteImage ? { uri: normalizedImageUri } : { uri: FALLBACK_IMAGE };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${ctaLabel}`}
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.card, pressed && onPress ? styles.pressed : null]}
    >
      <Image
        source={imageSource}
        style={[StyleSheet.absoluteFill, styles.image]}
        resizeMode="cover"
        accessible={false}
        onError={() => setHasImageError(true)}
      />

      <View style={[StyleSheet.absoluteFill, styles.tint]} pointerEvents="none" />

      <View style={styles.gradient} pointerEvents="none">
        {GRADIENT_STEPS.map((alpha, index) => (
          <View
            key={`${alpha}-${index}`}
            style={{
              flex: 1,
              backgroundColor: `rgba(0, 0, 0, ${alpha})`,
            }}
          />
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2} maxFontSizeMultiplier={1.2}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2} maxFontSizeMultiplier={1.2}>
            {subtitle}
          </Text>
        ) : null}

        {/* ✅ Simple <View> visuelle pour éviter d'imbriquer deux Pressable */}
        {ctaLabel ? (
          <Button
            title={ctaLabel}
            variant="primary"
            onPress={onPress}
            style={styles.cta}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 220,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: BrandColors.charcoal || '#111827',
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
  image: {
    borderRadius: 24,
  },
  tint: {
    backgroundColor: `rgba(17, 24, 39, ${BASE_TINT})`,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '75%',
  },
  content: {
    zIndex: 2,
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    fontFamily: BrandFonts.display,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
    opacity: 0.92,
    fontFamily: BrandFonts.body,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cta: {
    marginTop: 14,
  },
});
