import React from 'react'
import Layout from '../../components/layout/Layout'
import { GET_ARTICLES } from '../../lib/utils'
import { connect } from 'react-redux'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import styles from './styles.module.scss'
import { IS_MOBILE } from '../../lib/variables'
import { useQuery, gql } from "@apollo/client"

const ArticlePage = (props) => {
  const { data: { slug } } = props
  // const slug = 'pikcoins-que-son-y-como-redimir-cupones'
  const { data, loading, error } = useQuery(GET_ARTICLES, {
    context: {
      headers: {
        'Operation-Name': 'getArticles'
      }
    },
    variables: { slug }
  })

  if (loading) return <div>Loading...</div>
  console.log(data)
  const { content, mobile_content, summary, title } = data.getArticles[0] || {}
  const article = IS_MOBILE ? mobile_content : content

  return <Layout>
    <div id={styles.ArticlePage}>
      <h1 className='Card'>
        {summary}
        <small>{title}</small>
      </h1>
      <div className="m-b-20 Card post__content" dangerouslySetInnerHTML={{ __html: article }}></div>
    </div>
  </Layout>
}

ArticlePage.getInitialProps = async ({ query, req, res }) => {
  // const client = new ApolloClient({
  //   uri: process.env.API_URL,
  //   cache: new InMemoryCache()
  // })

  const slug = query?.id

  // const { data } = await client.query({
  //   query: GET_ARTICLES,
  //   variables: {
  //     slug
  //   }
  // })

  // if (!data.getArticles) {
  //   res.writeHead(301, {
  //     Location: '/404'
  //   })
  //   res.end()
  // }

  return {
    data: { slug }
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(ArticlePage)
