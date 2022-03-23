import Layout from "../components/layout/Layout"
import { getHome } from "../lib/utils"
import Portada from "../components/portada/Portada"

const Index = (props) => {
  const { feed } = props
  const descripcion = "Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas e independientes de alta confiabilidad ofreciendo videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch con los mejores precios del mercado en Colombia"
  const image = ""
  const title = "Pikplay - Compras gamers confiables"
  const url = "https://pikplay.co"
  return <Layout image={image} descripcion={descripcion} title={title} url={url}>
    <Portada feed={feed} />
  </Layout>
}

Index.getInitialProps = async () => {
  const isSSR = typeof window == 'undefined'
  const feed = await getHome({ isSSR })
  // store.dispatch({ type: 'TICK', payload: 'was set in error page ' + pathname });
  return {
    feed
  }
}

export default Index