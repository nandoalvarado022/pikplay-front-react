import React from 'react'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from '../lib/store'
import { ApolloProvider } from "@apollo/client"
import TagManager from 'react-gtm-module'
import graphqlClient from '../lib/graphqlClient'
import { Provider } from 'react-redux'

// CSS/SCSS
import "../styles/globalStyles.scss"
import "../styles/articlesList.scss"
import "react-image-gallery/styles/css/image-gallery.css"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const MyApp = (props) => {
  const { Component, pageProps, router } = props
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#466e96"
      },
      secondary: {
        main: '#E33E7F'
      }
    }
  });

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    TagManager.initialize({ gtmId: 'GTM-5WB6P7C' })
  }, []);

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