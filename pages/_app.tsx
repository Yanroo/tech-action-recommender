import type { AppProps } from 'next/app';
import '../styles/global.css'; // Ensure this is the correct path to your global CSS file

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
