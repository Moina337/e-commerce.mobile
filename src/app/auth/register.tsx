import { Stack, router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandColors, BrandFonts } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';

export default function RegisterScreen() {
  const signUp = useAuthStore((state) => state.signUp);
  const authError = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const submitDisabled = useMemo(() => {
    if (isSubmitting) {
      return true;
    }

    if (!name.trim()) {
      return true;
    }

    if (!email.trim() || !password.trim()) {
      return true;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailIsValid) {
      return true;
    }

    return password.trim().length < 8;
  }, [email, isSubmitting, name, password]);

  const handleSubmit = async () => {
    const cleanedName = name.trim();
    const cleanedEmail = email.trim();
    const cleanedPassword = password.trim();

    if (!cleanedName || !cleanedEmail || !cleanedPassword) {
      setLocalError('Complétez tous les champs avant de continuer.');
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail);
    if (!emailIsValid) {
      setLocalError('Adresse email invalide.');
      return;
    }

    if (cleanedPassword.length < 8) {
      setLocalError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    setIsSubmitting(true);
    setLocalError(null);
    clearError();

    try {
      await signUp({ name: cleanedName, email: cleanedEmail, password: cleanedPassword });

      if (router.canGoBack()) {
        router.back();
        return;
      }

      router.replace('/(tabs)');
    } catch {
      setLocalError('Une erreur est survenue lors de l’inscription.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = localError ?? authError;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Créer un compte',
        }}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={88}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerBlock}>
              <Text style={styles.title}>Créez votre compte</Text>
              <Text style={styles.subtitle}>Renseignez vos informations pour commencer.</Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Votre nom"
                placeholderTextColor={BrandColors.slate}
                autoCapitalize="words"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="prenom@mail.com"
                placeholderTextColor={BrandColors.slate}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Minimum 8 caractères"
                placeholderTextColor={BrandColors.slate}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                style={styles.input}
              />
            </View>

            {displayError ? <Text style={styles.errorText}>{displayError}</Text> : null}

            <Pressable
              accessibilityRole="button"
              onPress={handleSubmit}
              disabled={submitDisabled}
              style={({ pressed }) => [
                styles.submitButton,
                submitDisabled && styles.submitButtonDisabled,
                pressed && !submitDisabled && styles.submitButtonPressed,
              ]}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Chargement...' : 'Créer mon compte'}
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/auth/login')}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>{"J'ai déjà un compte"}</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BrandColors.stone,
  },
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
    backgroundColor: BrandColors.stone,
  },
  headerBlock: {
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontFamily: BrandFonts.display,
    color: BrandColors.charcoal,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: BrandFonts.body,
    color: BrandColors.slate,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontFamily: BrandFonts.body,
    fontWeight: '600',
    color: BrandColors.charcoal,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e4ddd6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: BrandColors.charcoal,
    fontFamily: BrandFonts.body,
  },
  errorText: {
    color: '#c43737',
    fontSize: 14,
    fontFamily: BrandFonts.body,
    marginBottom: 18,
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: BrandColors.charcoal,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonPressed: {
    opacity: 0.9,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: BrandFonts.display,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: BrandColors.charcoal,
    fontSize: 14,
    fontFamily: BrandFonts.body,
    fontWeight: '600',
  },
});
