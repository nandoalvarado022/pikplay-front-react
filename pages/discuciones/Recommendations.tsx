import React, { useContext } from 'react'
import { DiscussionsContext } from './discussionsContext'

const Recommendations = ({ Component, pageProps }) => {
  const { message, setMessage } = useContext(DiscussionsContext);
  return (<div>
    <h1>Recommendations</h1>
    {message}
  </div>
  )
}

export default Recommendations
