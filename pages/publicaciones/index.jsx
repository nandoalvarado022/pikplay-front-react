import React from 'react'
import Layout from '../../src/components/layout/Layout'
import Publicaciones from '../../src/components/publicaciones/Publicaciones'
import { validateTokenSrv } from '../../src/services/user/userService.ts'

export default function MyPublications(props) {
  return (
    <Layout
      title='Publicaciones'
      meta_title='Publicaciones'
      meta_url='https://pikplay.co/publicaciones'
    >
      <Publicaciones />
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
