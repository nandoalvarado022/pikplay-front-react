import Layout from "../../components/layout/Layout"
import Transacciones from "../../components/transacciones/Transacciones"
import { validateLoginToken } from "../../lib/utils"

export default function TransaccionesContainer(props) {
  const url = "https://pikajuegos.com/transacciones"
  const meta_title = "Pikplay | Mis Transacciones"
  const descripcion = "Pikplay | Mis Transacciones"
  return <Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title} title={meta_title}>
    <Transacciones />
  </Layout>
}

export const getServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies
  console.log('Cookies: ', ctx.req.cookies);
  const res = await validateLoginToken({ token })
  if (!res) {
    console.log('Token no valido');
    return {
      redirect: {
        destination: '/?action=not_authorized',
        permanent: false
      }
    }
  }
  return { props: {} }
}
