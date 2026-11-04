import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandColors, BrandFonts } from '@/constants/theme';

type ScreenStateProps = {
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
  onRetry?: () => void;
  children?: ReactNode;
};

export function ScreenState({
  isLoading = false,
  error,
  isEmpty = false,
  loadingText = 'Chargement...',
  errorText = 'Une erreur est survenue.',
  emptyText = 'Aucun résultat trouvé.',
  onRetry,
  children,
}: ScreenStateProps) {

  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size="large" color={BrandColors.copper} />
        <Text style={styles.stateText}>{loadingText}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.errorTitle}>Oups !</Text>
        <Text style={styles.stateText}>{errorText}</Text>
        {error && (
          <Text style={styles.errorMessage}>{error}</Text>
        )}
        {onRetry && (
          <Pressable style={styles.retryButton} onPress={onRetry} accessibilityRole="button">
            <Text style={styles.retryText}>Réessayer</Text>
          </Pressable>
        )}
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.errorTitle}>Aucun résultat</Text>
        <Text style={styles.stateText}>{emptyText}</Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1, // 💡 Aligne et étire le composant pour occuper tout l'espace central disponible
    justifyContent: 'center', // 💡 Centre verticalement au milieu de l'écran
    alignItems: 'center', // 💡 Centre horizontalement au milieu de l'écran
    padding: 24,
    gap: 10,
  },
  stateText: {
    color: BrandColors.charcoal,
    fontSize: 14,
    fontFamily: BrandFonts.body,
    textAlign: 'center',
  },
  errorTitle: {
    color: BrandColors.charcoal,
    fontSize: 20,
    fontWeight: '800',
    fontFamily: BrandFonts.display,
  },
  errorMessage: {
    color: BrandColors.slate,
    fontSize: 12,
    fontFamily: BrandFonts.body,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 4,
    backgroundColor: BrandColors.copper,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryText: {
    color: BrandColors.white,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: BrandFonts.body,
  },
});
