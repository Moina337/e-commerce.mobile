export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'https://ecommerce-api-1eu4.onrender.com/api';

const normalizeUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const base = API_BASE_URL.replace(/\/$/, '');
  const value = path.startsWith('/') ? path : `/${path}`;
  return `${base}${value}`;
};

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const contentType = response.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
      const data = (await response.json()) as Record<string, unknown>;
      const message =
        (typeof data?.message === 'string' && data.message) ||
        (typeof data?.error === 'string' && data.error) ||
        'Une erreur est survenue.';
      return message;
    }

    const text = await response.text();
    return text || 'Une erreur est survenue.';
  } catch {
    return 'Une erreur est survenue.';
  }
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const controller = new AbortController();
  const timeoutMs = 60000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = new Headers(options.headers ?? {});

    if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(normalizeUrl(path), {
      ...options,
      headers,
      signal: controller.signal,
    });

    if (!response.ok) {
      const message = await parseErrorMessage(response);
      throw new ApiError(response.status, message, response.status === 409 ? 'CONFLICT' : undefined);
    }

    const text = await response.text();
    if (!text) {
      return undefined as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(408, 'Le serveur répond trop lentement. Réessayez.', 'TIMEOUT');
    }

    if (error instanceof TypeError) {
      throw new ApiError(503, 'Connexion impossible. Vérifiez votre accès réseau.', 'NETWORK');
    }

    throw new ApiError(500, 'Une erreur est survenue.', 'UNKNOWN');
  } finally {
    clearTimeout(timeoutId);
  }
}

