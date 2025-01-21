
const BASE_URL_ENV = import.meta.env.VITE_BASE_URL;

if (BASE_URL_ENV && !URL.parse(BASE_URL_ENV)) {
  throw new Error(`can't parse provided VITE_BASE_URL: ${BASE_URL_ENV}, assuming misconfiguration`);
}

if (!BASE_URL_ENV) {
  console.warn('VITE_BASE_URL not provided; all links will be rendered without it')
}

export const BASE_URL = BASE_URL_ENV || '';
