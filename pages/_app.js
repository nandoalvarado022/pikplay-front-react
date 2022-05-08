import React, { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import graphqlClient from '../lib/graphqlClient'
import { ApolloProvider } from "@apollo/client"
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"
import { persistStore } from 'redux-persist'
import { useStore } from '../lib/store'

import '../styles/globalStyles.scss'

const MyApp = (props) => {
  const { Component, pageProps, router } = props
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#c93530"
      },
      secondary: {
        main: '#1b95b3'
      }
    }
  });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    TagManager.initialize({ gtmId: 'GTM-5WB6P7C' })
  }, [])

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('627225011598226') // facebookPixelId
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  return process.browser ? <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <ApolloProvider client={graphqlClient}>
          <Component {...pageProps} key={router.name} />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </MuiThemeProvider>
    : <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ApolloProvider client={graphqlClient}>
          <Component {...pageProps} key={router.name} />
        </ApolloProvider>
      </Provider>
    </MuiThemeProvider>
}

export default MyApp