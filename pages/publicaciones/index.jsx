import Layout from '../../components/layout/Layout'
import Publicaciones from '../../components/publicaciones/Publicaciones'
import { validateLoginToken } from '../../lib/utils'

export default function MyPublications(props) {
	return <Layout title="Publicaciones" meta_title="Publicaciones" meta_url="https://pikplay.co/publicaciones">
		<Publicaciones />
	</Layout>
}

export const getServerSideProps = async (ctx) => {
	const { token } = ctx.req.cookies
	const res = await validateLoginToken({ token })
	if (!res) {
	  return {
		redirect: {
		  destination: '/',
		  permanent: false
		}
	  }
	}
	return { props: {} }
  }
  