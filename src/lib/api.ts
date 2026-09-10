const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '');

export type User = {
  id: string;
  fullName: string;
  username: string;
  createdAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}, retryAfterRefresh = true): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  if (response.status === 401 && retryAfterRefresh && path !== '/auth/refresh' && path !== '/auth/login') {
    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { Origin: window.location.origin },
    });

    if (refreshResponse.ok) return request<T>(path, init, false);
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok || !body?.success) {
    throw new ApiError(body?.message || 'Something went wrong. Please try again.', response.status);
  }

  return body.data;
}

export const authApi = {
  register: (input: { fullName: string; username: string; password: string }) =>
    request<{ user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  login: (input: { username: string; password: string }) =>
    request<{ user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  me: () => request<{ user: User }>('/auth/me'),

  logout: () =>
    request<undefined>('/auth/logout', {
      method: 'POST',
      headers: { Origin: window.location.origin },
    }),
};
