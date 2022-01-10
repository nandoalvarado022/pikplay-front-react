import Layout from "../../components/layout/Layout"
import Transacciones from "../../components/transacciones/Transacciones"

const TransaccionesContainer = (props) => {
  const url = "https://pikajuegos.com/transacciones"
  const meta_title = "Pik-Play | Mis Transacciones"
  const descripcion = "Pik-Play | Mis Transacciones"
  return <Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title} title={meta_title}>
    <Transacciones props={props} />
  </Layout>
}

TransaccionesContainer.getInitialProps = () => {
  return {
    props: {}
  }
}

export default TransaccionesContainer