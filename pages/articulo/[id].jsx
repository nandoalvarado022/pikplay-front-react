import Router from "next/router"
import date from "date-and-time"
import toastr from "toastr"
import React from "react"
import Layout from "../../components/layout/Layout"
import { GET_ARTICLES } from "../../lib/utils"
import { connect } from "react-redux"
import { ApolloClient, InMemoryCache } from "@apollo/client"
import styles from './styles.module.scss'

const ArticlePage = (props) => {
  const { data } = props
  const { content, summary, title } = data[0]

  return <Layout>
    <div id={styles.ArticlePage}>
      <h1 className='Card'>
        {summary}
        <small>{title}</small>
      </h1>
      <div className="m-b-20 Card post__content" dangerouslySetInnerHTML={{ __html: content }}></div>
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
