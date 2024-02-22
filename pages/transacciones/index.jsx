import React from 'react'
import Layout from '../../src/components/layout/Layout'
import Transacciones from '../../src/components/transacciones/Transacciones'
import { validateTokenSrv } from '../../src/services/user/userService'
import { getTransactionsSrv } from '../../src/services/transaction/transactionService'

export default function TransaccionesContainer(props) {
  const { data } = props
  const url = 'https://pikajuegos.com/transacciones'
  const meta_title = 'Pikplay | Mis Transacciones'
  const descripcion = 'Pikplay | Mis Transacciones'
  return (
    <Layout
      meta_url={url}
      meta_descripcion={descripcion}
      meta_title={meta_title}
      title={meta_title}>
      <Transacciones data={data} />
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const { statusCode } = await validateTokenSrv(ctx)
  if (statusCode === 403) {
    return {
      redirect: {
        destination: '/?action=not_authorized',
        permanent: false,
      },
    }
  }

  const data = await getTransactionsSrv(ctx);
  return {
    props: {
      data
    }
  }
}
