import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// this manifest is used temporarily for development purposes
const manifestUrl = 'https://tong92.github.io/twa-sample/twa-sample-manifeset.json';

createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)
