import Layout from "../components/layout/Layout"
import { getFeed } from "../lib/utils"
import Portada from "../components/portada/Portada"

const Index = (props) => {
  const { feed } = props
  const url = "https://pik-play.com"
  const meta_title = "Videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch al mejor precio del mercado"
  const descripcion = "Pik-Play es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas de venta de videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch de alto prestigio en Colombia"
  return <Layout meta_url={url} meta_descripcion={descripcion} meta_title={meta_title} title={meta_title}>
    <Portada feed={feed} />
  </Layout>
}

Index.getInitialProps = async () => {
  const feed = await getFeed({})
  // console.log("FEED ES:" + feed.length)
  // console.log('2. Page.getInitialProps uses the store to dispatch things');
  // store.dispatch({ type: 'TICK', payload: 'was set in error page ' + pathname });
  return {
    feed
  }
}

export default Index