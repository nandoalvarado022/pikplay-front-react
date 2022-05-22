import Checkout from "../components/checkout/Checkout"
import dynamic from 'next/dynamic'
import Layout from "../components/layout/Layout"

const Test = () => {
  return <Layout>
    <Checkout />
  </Layout>
}

export default Test