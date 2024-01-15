import React from 'react'
import Checkout from '../src/components/checkout/Checkout'
import dynamic from 'next/dynamic'
import Layout from '../src/components/layout/Layout'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const Test = () => {
  return (
    <Layout>
      <div style={{ height: '200px', width: '200px' }}>
        <LiteYouTubeEmbed
          id="U_oewgFysiY"
          title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
          poster="mqdefault"
          autoplay={true}
          muted={true}
        />
      </div>
      {/* <iframe
        width='560'
        height='315'
        src='https://www.youtube.com/embed/U_oewgFysiY'
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe> */}

    </Layout>
  )
}

export default Test
