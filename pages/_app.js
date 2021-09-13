import Head from 'next/head'
import { StoreProvider } from '../provider/storeProvider';
// import  {AppProps} from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../sass/global.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin />

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
