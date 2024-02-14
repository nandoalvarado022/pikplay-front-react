import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post } = CustomFetch()

const BASE_URL = "/users"
const getUsersSrv = async () => {
  const data = await get(BASE_URL);
  return data
}

const loginSrv = async (code: number, phone: string) => {
  const path = BASE_URL + "/login"
  const data = await post(path, { code, phone });
  return data
}

const updateProfile = async (phone: string, name: string, lastName: string) => {
  
}

const validateTokenSrv = async (phone, token) => {
  const path = BASE_URL + "/validate"
  const data = await post(path, { phone, token });
  return data
}

const sendCodeSrv = async (phone) => {
  const path = BASE_URL + "/login"
  const data = await post(path, { phone });
  return data
}

const getNotificationsSrv = async () => {
  const data = await get(BASE_URL + "/notifications");
  return data
}

const readNotificationSrv = async (nid: number) => {
  const data = await get(BASE_URL + `/${nid}/read`);
  return data
}

export {
  getUsersSrv,
  loginSrv,
  validateTokenSrv,
  sendCodeSrv,
  getNotificationsSrv,
  readNotificationSrv
}
