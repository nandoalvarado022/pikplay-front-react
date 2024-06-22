import CustomFetch from "../../components/fetch/CustomFetch";
const { get, post } = CustomFetch()

const getChallengeUserSrv = async (ctx, slug = null) => {
  const path = `/users/challenges`;
  return get(ctx, path);
}

export {
  getChallengeUserSrv
}
