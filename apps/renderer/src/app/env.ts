
const ENCODER_URL_ENV = import.meta.env.VITE_ENCODER_URL;

if (ENCODER_URL_ENV && !URL.parse(ENCODER_URL_ENV)) {
  throw new Error(`can't parse provided VITE_ENCODER_URL: ${ENCODER_URL_ENV}, assuming misconfiguration`);
}

if (!ENCODER_URL_ENV) {
  console.warn('VITE_ENCODER_URL not provided; all links will be rendered without it')
}

export const ENCODER_URL = ENCODER_URL_ENV;
