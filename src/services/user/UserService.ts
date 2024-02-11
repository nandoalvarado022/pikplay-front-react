import CustomFetch from "../../components/fetch/CustomFetch";
const { get, post } = CustomFetch()

const BASE_URL = "/users"
const getUsersSrv = async () => {
  const data = await get(BASE_URL);
  return data
}

const loginSrv = async (code, phone) => {
  const path = BASE_URL + "/login"
  const data = await post(path, { code, phone });
  return data
}

const validateTokenSrv = async (phone, token) => {
  const path = BASE_URL + "/validate"
  const data = await post(path, { phone, token });
  return data
}

export {
  getUsersSrv,
  loginSrv,
  validateTokenSrv
}
