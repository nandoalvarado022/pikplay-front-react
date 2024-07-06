import CustomFetch from "../../components/fetch/CustomFetch";
const { get, post } = CustomFetch()

const getChallengeUserSrv = async (ctx, { limit, slug = null, notCompletedOnly }) => {
  let params = limit ? `?limit=${limit}` : '?limit=10';
  if (notCompletedOnly) params += '&notCompletedOnly=true';
  const path = `/users/challenges${params}`;
  return get(ctx, path);
}

export {
  getChallengeUserSrv
}
