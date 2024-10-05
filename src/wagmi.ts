import { http, createConfig } from 'wagmi'
import {arbitrum} from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [arbitrum],
  connectors: [
    injected(),

    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [arbitrum.id]: http(),
   
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
