// eslint-disable-next-line import/prefer-default-export
export const LANDING_URL = 'https://acquity.io';

export const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://app.acquity.io'
    : 'http://localhost:3000';
