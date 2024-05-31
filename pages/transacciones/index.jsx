import React from 'react'
import Layout from '../../src/components/layout/Layout'
import Transacciones from '../../src/components/transacciones/Transacciones'
import { validateTokenSrv } from '../../src/services/user/userService'

export default function TransaccionesContainer(props) {
  const url = 'https://pikajuegos.com/transacciones'
  const meta_title = 'Pikplay | Mis Transacciones'
  const descripcion = 'Pikplay | Mis Transacciones'
  return (
    <Layout
      meta_url={url}
      meta_descripcion={descripcion}
      meta_title={meta_title}
      title={meta_title}>
      <Transacciones />
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const { token } = ctx.req.cookies
  const res = await validateTokenSrv({ token })
  if (!res) {
    return {
      redirect: {
        destination: '/?action=not_authorized',
        permanent: false,
      },
    }
  }
  return { props: {} }
}
