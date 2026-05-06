import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const TOKEN_KEY = 'hp_admin_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// Pre-configured axios instance for admin API calls — automatically attaches
// the bearer token and clears it + redirects on a 401.
export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      tokenStore.clear();
      // Only auto-redirect from /admin/* pages so public pages keep working
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(err);
  }
);

export const formatApiError = (err) => {
  const detail = err?.response?.data?.detail;
  if (!detail) return err?.message || 'Something went wrong.';
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail.map((e) => (e?.msg ? e.msg : JSON.stringify(e))).filter(Boolean).join(' ');
  }
  if (detail?.msg) return detail.msg;
  return String(detail);
};
