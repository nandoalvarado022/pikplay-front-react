import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post } = CustomFetch()

const BASE_URL = "/transactions"
const createTransactionsSrv = async (props) => {
  const { slug } = props
  const data = await post(null, `${BASE_URL}`, props);
  return data
}

const getTransactionsSrv = async (props) => {
  const data = await get(BASE_URL);
  return data
}

export {
  getTransactionsSrv,
  createTransactionsSrv,
}
