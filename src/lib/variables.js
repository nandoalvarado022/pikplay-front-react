export const API_URL = process.env == 'production' ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION : process.env.NEXT_PUBLIC_API_URL_DEVELOP
export const IS_MOBILE = typeof window !== 'undefined' ? window.screen.width <= 420 : false
