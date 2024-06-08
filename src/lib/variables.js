const VARS = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  IS_MOBILE: typeof window !== "undefined" ? window.screen.width <= 420 : false,
  IS_TABLET: typeof window !== 'undefined' ? window.screen.width <= 768 : false,
  IS_ADMIN: false,
}

export default VARS

export const IS_MOBILE = typeof window !== 'undefined' ? window.screen.width <= 420 : false
