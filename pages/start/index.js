import Layout from '../../components/layout/Layout'

const Start = () => {
  const url = 'https://pikplay.co/start'
  const meta_title = 'Pikplay'
  const descripcion =
    'Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas de venta de videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch de alto prestigio en Colombia'
  return (
    <Layout
      meta_url={url}
      meta_descripcion={descripcion}
      meta_title={meta_title}
    >
      Bienvenido a Pikplay
    </Layout>
  )
}

export default Start
