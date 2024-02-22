import CustomFetch from "../../components/fetch/CustomFetch";
const { get } = CustomFetch()

const getCompetitions = async (ctx) => {
  const path = "/competitions"
  const data = await get(ctx, path);
  return data
}

export {
  getCompetitions
}
