import Layout from "../components/layout/Layout"
import { getFeed } from "../lib/utils"
import Portada from "../components/portada/Portada"

export async function getStaticProps({ req, query }) {
  let feed = await getFeed({})
  return { props: { feed } }
}

const Index = ({ feed }) => {
  const url = "https://pik-play.com"
  const meta_title = "Videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch al mejor precio del mercado"
  const descripcion = "Pik-Play es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas de venta de videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch de alto prestigio en Colombia"
  return <Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title} title={meta_title}>
    {feed && <Portada feed={feed} />}
  </Layout>
}

export default Index