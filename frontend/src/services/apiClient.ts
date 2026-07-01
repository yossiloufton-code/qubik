import type { ApiResponse, ApiSuccessResponse } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

export class ApiClientError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(message: string, statusCode: number, code = 'API_ERROR', details?: unknown) {
    super(message);

    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

interface ApiRequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean | null | undefined>;
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const normalizePath = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`;
};

const getBrowserOrigin = () => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return 'http://localhost:5173';
};

const buildUrl = (path: string, query?: ApiRequestOptions['query']) => {
  const baseUrl = trimTrailingSlash(API_BASE_URL);
  const requestPath = normalizePath(path);

  /**
   * Supports both:
   * - Local dev: http://localhost:3000/api
   * - Docker/Nginx: /api
   */
  const url = new URL(`${baseUrl}${requestPath}`, getBrowserOrigin());

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

export const apiClient = {
  async request<TData>(path: string, options: ApiRequestOptions = {}): Promise<ApiSuccessResponse<TData>> {
    const { query, headers, body, ...requestOptions } = options;

    let response: Response;

    try {
      response = await fetch(buildUrl(path, query), {
        ...requestOptions,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body,
      });
    } catch {
      throw new ApiClientError('Network error. Please check your connection and try again.', 0, 'NETWORK_ERROR');
    }

    let payload: ApiResponse<TData> | null = null;

    try {
      payload = (await response.json()) as ApiResponse<TData>;
    } catch {
      throw new ApiClientError('Invalid API response', response.status, 'INVALID_RESPONSE');
    }

    if (!response.ok || payload.success === false) {
      const message = payload?.success === false ? payload.error.message : 'Request failed';
      const code = payload?.success === false ? payload.error.code : 'REQUEST_FAILED';
      const details = payload?.success === false ? payload.error.details : undefined;

      throw new ApiClientError(message, response.status, code, details);
    }

    return payload;
  },
};