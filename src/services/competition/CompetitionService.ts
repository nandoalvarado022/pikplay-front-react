import CustomFetch from "../../components/fetch/CustomFetch";
const { get } = CustomFetch()

const getCompetitions = async () => {
  const path = "/competitions"
  const data = await get(path);
  return data
}

export {
  getCompetitions
}
