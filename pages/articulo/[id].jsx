import React from "react"
import Layout from "../../components/layout/Layout"
import { GET_ARTICLES } from "../../lib/utils"
import { connect } from "react-redux"
import { ApolloClient, InMemoryCache } from "@apollo/client"
import styles from './styles.module.scss'
import { IS_MOBILE } from "../../lib/variables"

const ArticlePage = (props) => {
  const { data } = props
  const { content, mobile_content, summary, title } = data[0]
  const article = mobile_content
  return <Layout>
    <div id={styles.ArticlePage}>
      <h1 className='Card'>
        {summary}
        <small>{title}</small>
      </h1>
      <div className="m-b-20 Card post__content" dangerouslySetInnerHTML={{ __html: mobile_content }}></div>
    </div>
  </Layout>
}

ArticlePage.getInitialProps = async ({ query, req, res }) => {
  const client = new ApolloClient({
    uri: process.env.API_URL,
    cache: new InMemoryCache()
  });

  const slug = query?.id

  const { data } = await client.query({
    query: GET_ARTICLES,
    variables: {
      slug
    }
  })

  if (!data.getArticles) {
    res.writeHead(301, {
      Location: '/404'
    });
    res.end();
  }

  return {
    data: data.getArticles
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(ArticlePage)
