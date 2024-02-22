import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post } = CustomFetch()

const BASE_URL = "/publications"
const getPublicationsSrv = async () => {
  const data = await get(null, BASE_URL);
  return data
}

const getPortadaSrv = async () => {
  const data = await get(null, BASE_URL + '/portada');
  return data
}

/*const loginSrv = async (ctx, code: number, phone: string) => {
  const path = BASE_URL + "/login"
  const data = await post(ctx, path, { code, phone });
  return data
}*/

export {
  getPublicationsSrv,
  getPortadaSrv
}
