export const ROOT = '/';

// Unauthed routes
export const LOGIN = '/login';
export const LINKEDIN_CALLBACK = '/auth/callback';
// Can be used to prevent authed users from visiting these routes
export const UNAUTHED_ROUTES = [LOGIN, LINKEDIN_CALLBACK];

// Authed routes
export const HOME = '/home';
export const BIDS = '/bids';
export const OFFERS = '/offers';
export const CHAT = '/matches';
export const SETTINGS = '/settings';

export const ADMIN = '/admin';
