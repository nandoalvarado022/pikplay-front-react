import CustomFetch from "../../components/fetch/CustomFetch";

const { get, post } = CustomFetch()

const BASE_URL = "/transactions"
const getTransactionsSrv = async (ctx) => {
  const data = await get(ctx, BASE_URL);
  return data;
}

const createTransactionsSrv = async (props) => {
  const { slug } = props
  const data = await post(null, `${BASE_URL}`, props);
  return data
}

export {
  getTransactionsSrv,
  createTransactionsSrv,
}
