import CustomFetch from "../../components/fetch/CustomFetch";
import cookieCutter from '@boiseitguru/cookie-cutter'
const { get, post } = CustomFetch()

const BASE_URL = "/ranking"
const getRankingSrv = async () => {
  const data = await get(null, BASE_URL);
  return data
}

export {
  getRankingSrv,
}
