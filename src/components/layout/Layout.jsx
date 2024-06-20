/* eslint-disable no-undef */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'
import toastr from 'toastr'
import { initGA, logPageView } from '../../../public/analytics'
import { register } from 'next-offline/runtime'
import useSystemStore from '../../hooks/useSystem.js'
import Body from './Body.jsx'
import { useIAStore } from '../ia/IAstore.jsx'

toastr.options.timeOut = 10000

Router.onRouteChangeStart = url => {
  NProgress.start()
}
Router.onRouteBeforeHistoryChange = url => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Layout = (props) => {
  const [isReady, setIsReady] = useState(false)
  const { children, descripcion, image, title, url } = props
  const { env, setValue, userLogged, notifications } = useSystemStore((state => state))
  const { checkIAMessage, IAMessage } = useIAStore()

  useEffect(() => {
    checkIAMessage(IAMessage); // Check if there is an IA message to show
    (setValue && !env && props?.env) && setValue('env', props?.env);
    register()
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, () => {
    setTimeout(() => {
      setIsReady(true)
    }, 1000)
  });

  const loadAmplitude = () => {
    // Amplitude
    window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }))
      .promise.then(() => {
        window.amplitude.add(window.amplitudeAutocapturePlugin.plugin());
        window.amplitude.init('30684c35f0937bb29637b9d69e2fa2f7');
      })
  }

  const loadPusherScript = (src) => {
    let script = document.createElement('script');
    script.src = 'https://js.pusher.com/beams/1.0/push-notifications-cdn.js';

    script.onload = function () {
      // Pusher https://pusher.com
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: "97987026-b7c4-4f54-9269-626ab15765c5",
      });

      beamsClient
        .start()
        .then((beamsClient) => beamsClient.getDeviceId())
        .then((deviceId) => {
          console.log("Successfully registered with Beams. Device ID:", deviceId)
        })
        .catch((err) => {
        });
    };
    document.head.appendChild(script);
  }

  useEffect(() => {
    loadPusherScript()
    loadAmplitude()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta property='title' content={title} />
        <meta property='og:title' content={title} />
        <meta name='description' content={descripcion} />
        <meta property='og:description' content={descripcion} />
        <meta property='og:image' content={image} />
        <meta name='url' content={url} />
        <meta name='og:url' content={url} />
        <meta name='og:site_name' content='Pikplay' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0' />
        <meta name='theme-color' content='#476E95' />
        <meta
          name='google-site-verification'
          content='4IqXj9YLrm5eo3s_c3cTKcAqBwUhCf8qgJgL2sLtJko' />
        <meta name='twitter:description' content={descripcion} />
        <meta name='keywords' value='' />
        <meta name='country' content='COL' />
        <meta name='author' content='pikplay.co' />
        <meta name='copyright' content='pikplay.co' />
        <meta name='language' content='es-CO'></meta>
        <meta httpEquiv='ScreenOrientation' content='autoRotate:disabled' />
        {/* Global site tag (gtag.js) - Google Ads: 941382150 */}
        <link rel='alternate' href={url} hrefLang='es-CO' />
        <link rel='canonical' href={url} />
        <link rel='icon' type='image/png' href='/images/logos/logo48x48.png' />
        <link rel='manifest' href={`/manifest.json`} />
        <link rel="stylesheet" href="/font-awesome-4.7.0/css/font-awesome.min.css"></link>
        <script type='text/javascript' src='https://checkout.epayco.co/checkout.js'></script>
        <script src="https://cdn.amplitude.com/libs/analytics-browser-2.7.4-min.js.gz"></script>
        <script src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.2.3-min.js.gz"></script>
        <script src="https://cdn.amplitude.com/libs/plugin-autocapture-browser-0.9.0-min.js.gz"></script>

        {() => {
          alert()
          loadPusherScript()

          // Google Analytics
          window.dataLayer = window.dataLayer || []
          function gtag() {
            // eslint-disable-next-line
            dataLayer.push(arguments)
          }
          gtag('js', new Date())
          gtag('config', 'AW-941382150')
          gtag('event', 'conversion', {
            send_to: 'AW-941382150/e71oCMvon-0BEIa08cAD',
          })
        }}()
      </Head>
      <Body isReady={isReady} notifications={notifications} userLogged={userLogged}>
        {children}
      </Body>
    </React.Fragment >
  )
}

export default Layout
