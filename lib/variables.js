export default {
  API_URL: process.env.API_URL,
  IS_MOBILE: typeof window != "undefined" ? window.screen.width <= 420 : false,
  IS_TABLET: typeof window != "undefined" ? window.screen.width <= 768 : false,
  IS_ADMIN: false
}