import { ConnectButton, Connector } from '@ant-design/web3';
import {
  CoinbaseWallet,
  ImToken,
  MetaMask,
  MobileWallet,
  OkxWallet,
  SafeheronWallet,
  TokenPocket,
  WagmiWeb3ConfigProvider,
  WalletConnect,
} from '@ant-design/web3-wagmi';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  multiInjectedProviderDiscovery: true,
  connectors: [
    walletConnect({
      showQrModal: false,
      projectId: YOUR_WALLET_CONNECT_PROJECT_ID,
    }),
    coinbaseWallet({
      appName: 'ant.design.web3',
      jsonRpcUrl: `https://api.zan.top/node/v1/eth/mainnet/${YOUR_ZAN_API_KEY}`,
    }),
  ],
});

const App: React.FC = () => {
  return (
    <WagmiWeb3ConfigProvider
      eip6963={{
        autoAddInjectedWallets: true,
      }}
      wallets={[
        MetaMask(),
        TokenPocket({
          group: 'Popular',
        }),
        MobileWallet({
          group: 'Popular',
        }),
        WalletConnect(),
        CoinbaseWallet(),
        SafeheronWallet(),
        OkxWallet(),
        ImToken(),
      ]}
      config={config}
    >
      <Connector
        modalProps={{
          footer: (
            <div>
              Powered By <a href="https://web3.ant.design">Ant Design Web3</a>
            </div>
          ),
        }}
      >
        <ConnectButton />
      </Connector>
    </WagmiWeb3ConfigProvider>
  );
};

export default App;
