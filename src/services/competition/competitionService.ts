import CustomFetch from "../../components/fetch/CustomFetch";
const { get, post } = CustomFetch()

const getComptSrv = async (ctx, slug = null) => {
  const path = slug ? `/competitions/${slug}` : '/competitions'
  return get(ctx, path);
}

const getEnvVariables = async (ctx, slug = null) => {
  return get(ctx, "");
}

const deleteCompetitionMemberSrv = async (competitionID, number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
  // const url = path + '/delete-member'
  // const params = { competitionID, number }
  // const data = await post(null, path, params)
  // return data
}

export {
  deleteCompetitionMemberSrv,
  getComptSrv,
  getEnvVariables
}
