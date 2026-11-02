import { Image, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button/button';
import { BrandColors, BrandFonts } from '@/constants/theme';

type HeroBannerProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  imageUri?: string;
  onPress?: () => void;
};

export function HeroBanner({
  title = 'Marchez avec caractère',
  subtitle = 'Découvrez notre sélection de chaussures pour homme.',
  ctaLabel = 'Découvrir les offres',
  imageUri = 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80',
  onPress,
}: HeroBannerProps) {
  return (
    <View style={styles.heroCard}>
      <View style={styles.heroContent}>
        <Text style={styles.heroLabel}>Nouveautés</Text>
        <Text style={styles.heroTitle}>{title}</Text>
        <Text style={styles.heroSubtitle}>{subtitle}</Text>

        <Button title={ctaLabel} onPress={onPress} variant="primary" />
      </View>

      <Image
        source={{ uri: imageUri }}
        style={styles.heroImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 26,
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
  heroImage: {
    width: 120,
    height: 132,
    borderRadius: 18,
  },
});
