import React from 'react'
import { redirect } from 'next/navigation'
import Layout from '../src/components/layout/Layout'
import { checkIsMobile, getHome } from '../src/lib/utils'
import Portada from './index/components/portada/Portada'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { getPortadaSrv } from '../src/services/publication/publicationService'

const Index = props => {
  const { action, env, feed } = props
  const descripcion =
    'Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas e independientes de alta confiabilidad ofreciendo videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch con los mejores precios del mercado en Colombia'
  const image = ''
  const title = 'Pikplay - Compras gamers confiables'
  const url = 'https://pikplay.co'

  return (
    <Layout
      descripcion={descripcion}
      env={env}
      image={image}
      title={title}
      url={url}>
      <Portada feed={feed} />
      {/* <Testimonials /> */}
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const agent = ctx.req.headers["user-agent"]
  const isMobile = checkIsMobile(agent)
  // debugger;
  if (!isMobile && ctx.req.url === '/') {
    return {
      redirect: {
        destination: '/desktop',
        permanent: false,
      },
      props: {},
    }
  }

  const env = process.env.ENV
  const action = ctx.query?.action || null
  const isSSR = typeof window === 'undefined'
  // const feed = await getHome({ isSSR, origin: 'indexPage' })
  const feed = await getPortadaSrv()
  return {
    props: {
      env,
      action,
      feed,
      // redirection: "/desktop"
    }
  }
}

export default Index
