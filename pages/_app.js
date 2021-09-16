import Head from 'next/head'
import { StoreProvider } from '../provider/storeProvider';
// import  {AppProps} from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/global.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router'
import NProgress from 'nprogress'


Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />

        <title>Book Store</title>

      </Head>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
      <ToastContainer />
    </>
  )
}


export default App;
