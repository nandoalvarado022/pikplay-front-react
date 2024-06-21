import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post } = CustomFetch()

const BASE_URL = "/users"
const getUsersSrv = async () => {
  const data = await get(null, BASE_URL);
  return data
}

const loginSrv = async (ctx: any, phone: string, code: number) => {
  const path = BASE_URL + "/login"
  const data = await post(ctx, path, { code, phone });
  return data
}

const updateProfileSrv = async (userDataUpdated: any) => {
  const path = BASE_URL + "/update"
  const data = await post(null, path, userDataUpdated);
  return data
}

const validateTokenSrv = async (ctx) => {
  const path = BASE_URL + "/validate-token"
  const data = await post(ctx, path, {});
  return data
}

const sendCodeSrv = async (ctx, phone) => {
  const path = BASE_URL + "/login"
  const data = await post(ctx, path, { phone });
  return data
}

const saveReferral = async (phone) => {
  const path = BASE_URL + "/referrals"
  const data = await post(null, path, { phone });
  return data
}

const getNotificationsSrv = async () => {
  const data = await get(null, BASE_URL + "/notifications");
  return data
}

const getReferralsSrv = async () => {
  const data = await get(null, BASE_URL + "/referrals");
  return data
}

const readNotificationSrv = async (nid: number) => {
  const data = await get(null, BASE_URL + `/${nid}/read`);
  return data
}

const getExperiencesSrv = async (ctx) => {
  try {
    const { code, data: experiences } = await get(ctx, `${BASE_URL}/experiences`);
    const expTotal = experiences.reduce((total, obj) => total + obj.value, 0);
    return {
      expTotal,
      experiences,
    }
  } catch (err) {
    // TODO - Implementar un logger
    console.error("Error al obtener las experiencias del usuario", err);
    return {
      expTotal: 0,
      experiences: [],
    }
  }
}

export {
  getExperiencesSrv,
  getNotificationsSrv,
  getReferralsSrv,
  getUsersSrv,
  loginSrv,
  readNotificationSrv,
  sendCodeSrv,
  updateProfileSrv,
  validateTokenSrv,
  saveReferral,
}
