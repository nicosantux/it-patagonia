import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { NuqsAdapter } from 'nuqs/adapters/react'

import App from './app.tsx'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <NuqsAdapter>
    <StrictMode>
      <App />
    </StrictMode>
  </NuqsAdapter>,
)
