import CustomFetch from "../../components/fetch/CustomFetch";
const { get, post } = CustomFetch()

const path = "/competitions"
const getComptSrv = async () => {
  const data = await get(path);
  return data
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
  getComptSrv
}
