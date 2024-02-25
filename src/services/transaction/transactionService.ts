import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post } = CustomFetch()

const BASE_URL = "/transactions"
const createTransactionsSrv = async (props) => {
  const { slug } = props
  const data = await post(null, `${BASE_URL}`, props);
  return data
}

export {
  createTransactionsSrv,
}
