import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button/button';
import { ScreenState } from '@/components/screen-state';
import { BrandColors, BrandFonts } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';

export default function ProfileScreen() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const error = useAuthStore((state) => state.error);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const signOut = useAuthStore((state) => state.signOut);

  const isLoading = status === 'loading';
  const isSignedIn = status === 'signedIn' && !!user;

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Voulez-vous vraiment vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Se déconnecter',
        style: 'destructive',
        onPress: () => {
          void signOut();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenState
        isLoading={isLoading}
        error={error}
        loadingText="Vérification du profil..."
        errorText="Impossible de récupérer votre session."
        onRetry={() => {
          void restoreSession();
        }}
      >
        {!isSignedIn ? (
          <View style={styles.emptyState}>
            <Text style={styles.helloText}>Votre profil</Text>
            <Text style={styles.emptyText}>
              Connectez-vous pour consulter vos informations et gérer votre compte.
            </Text>
            <Button
              title="Se connecter"
              onPress={() => router.push('/auth/login' as any)}
              style={styles.actionButton}
            />
          </View>
        ) : (
          <View style={styles.profileCard}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarText}>
                {user.name
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((word: string) => word[0]?.toUpperCase())
                  .join('') || 'U'}
              </Text>
            </View>

            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>

            {user.role === 'ADMIN' ? <Text style={styles.roleBadge}>ADMIN</Text> : null}

            <Button
              title="Mes commandes"
              variant="ghost"
              onPress={() => router.push('/commandes')}
              style={styles.ordersButton}
            />

            <Button
              title="Se déconnecter"
              variant="secondary"
              onPress={handleLogout}
              style={styles.logoutButton}
            />
          </View>
        )}
      </ScreenState>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BrandColors.stone,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  helloText: {
    fontFamily: BrandFonts.display,
    fontSize: 28,
    color: BrandColors.charcoal,
  },
  emptyText: {
    fontFamily: BrandFonts.body,
    fontSize: 15,
    color: BrandColors.slate,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionButton: {
    marginTop: 8,
    alignSelf: 'stretch',
  },
  profileCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BrandColors.copper,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: BrandColors.white,
    fontFamily: BrandFonts.display,
    fontSize: 26,
  },
  name: {
    fontFamily: BrandFonts.display,
    fontSize: 24,
    color: BrandColors.charcoal,
  },
  email: {
    fontFamily: BrandFonts.body,
    fontSize: 15,
    color: BrandColors.slate,
  },
  roleBadge: {
    backgroundColor: BrandColors.white,
    borderWidth: 1,
    borderColor: BrandColors.line,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontFamily: BrandFonts.body,
    fontSize: 11,
    fontWeight: '700',
    color: BrandColors.copper,
  },
  ordersButton: {
    marginTop: 8,
    alignSelf: 'stretch',
  },
  logoutButton: {
    marginTop: 16,
    alignSelf: 'stretch',
  },
});
