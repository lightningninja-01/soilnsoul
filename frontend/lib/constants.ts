export const WHATSAPP_NUMBER = '919580417547';
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.soilnsoultravels.com';
export const SITE_URL = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
