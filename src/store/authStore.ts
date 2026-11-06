import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';

import { ApiError } from '@/services/api';
import { getMe, loginUser, registerUser } from '@/services/authService';
import type { AuthStatus, LoginInput, RegisterInput, User } from '@/types/auth';

const TOKEN_KEY = 'ecommerce_auth_token';

const persistToken = async (token: string | null) => {
  if (Platform.OS === 'web') {
    return;
  }

  if (!token) {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    return;
  }

  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

const readToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return null;
  }

  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch {
    return null;
  }
};

const normalizeAuthError = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return 'Identifiants incorrects.';
    }

    if (error.status === 409) {
      return 'Ce compte est déjà utilisé. Essayez un autre email.';
    }

    if (error.status === 408 || error.status === 504) {
      return 'Le serveur répond trop lentement. Réessayez.';
    }

    if (error.status >= 500) {
      return 'Connexion impossible avec le serveur. Réessayez.';
    }

    return error.message || 'Une erreur est survenue.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Une erreur est survenue.';
};

type AuthState = {
  status: AuthStatus;
  token: string | null;
  user: User | null;
  error: string | null;
  restoreSession: () => Promise<void>;
  signIn: (input: LoginInput) => Promise<void>;
  signUp: (input: RegisterInput) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  token: null,
  user: null,
  error: null,

  clearError: () => set({ error: null }),

  restoreSession: async () => {
    const savedToken = await readToken();

    if (!savedToken) {
      set({ status: 'signedOut', token: null, user: null, error: null });
      return;
    }

    try {
      const user = await getMe(savedToken);

      if (!user.enabled) {
        await persistToken(null);
        set({
          status: 'signedOut',
          token: null,
          user: null,
          error: 'Votre compte a été désactivé. Contactez le support.',
        });
        return;
      }

      set({ status: 'signedIn', token: savedToken, user, error: null });
    } catch (error) {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        await persistToken(null);
        set({ status: 'signedOut', token: null, user: null, error: null });
        return;
      }

      set({
        status: 'signedIn',
        token: savedToken,
        user: null,
        error: 'La vérification de votre session a échoué. Réessayez.',
      });
    }
  },

  signIn: async (input) => {
    try {
      const authResponse = await loginUser(input);
      const user = await getMe(authResponse.accessToken);

      if (!user.enabled) {
        await persistToken(null);
        set({ status: 'signedOut', token: null, user: null, error: 'Votre compte est désactivé.' });
        return;
      }

      await persistToken(authResponse.accessToken);
      set({ status: 'signedIn', token: authResponse.accessToken, user, error: null });
    } catch (error) {
      const message = normalizeAuthError(error);
      set({ status: 'signedOut', token: null, user: null, error: message });
      throw error;
    }
  },

  signUp: async (input) => {
    try {
      const authResponse = await registerUser(input);
      const user = await getMe(authResponse.accessToken);

      if (!user.enabled) {
        await persistToken(null);
        set({ status: 'signedOut', token: null, user: null, error: 'Votre compte ne peut pas être utilisé pour le moment.' });
        return;
      }

      await persistToken(authResponse.accessToken);
      set({ status: 'signedIn', token: authResponse.accessToken, user, error: null });
    } catch (error) {
      const message = normalizeAuthError(error);
      set({ status: 'signedOut', token: null, user: null, error: message });
      throw error;
    }
  },

  signOut: async () => {
    await persistToken(null);
    set({ status: 'signedOut', token: null, user: null, error: null });
  },
}));
