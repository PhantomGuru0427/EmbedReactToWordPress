import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./routerHistory";
import Presale from "./views/Presale";
import Menu from "./components/Menu";
import { MAINNET_CHAINID } from "./config";
import getNodeUrl from "./utils/getRpcUrl";
import ConnectWalletModal from "./components/ConnectWalletModal";
import useAuth from "./hooks/useAuth";

function App() {
  const [open, setOpen] = React.useState(false);
  const { login } = useAuth();

  const handleConnectWalletClose = () => {
    setOpen(() => false);
  };
  const handleConnectWalletOpen = () => {
    setOpen(() => true);
  };

  useEffect(() => {
    const checkNetwork = async () => {
      if (
        (window as WindowChain) &&
        (window as WindowChain).ethereum &&
        (window as WindowChain).ethereum?.networkVersion
      ) {
        if (
          (window as WindowChain).ethereum?.networkVersion !==
          MAINNET_CHAINID.toString()
        ) {
          try {
            await (window as WindowChain).ethereum?.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: `0x${MAINNET_CHAINID.toString(16)}` }],
            });
            return true;
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              const rpcUrl = getNodeUrl(MAINNET_CHAINID);
              // @ts-ignore
              await provider.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${MAINNET_CHAINID.toString(16)}`,
                    chainName: "MATIC Mainnet",
                    nativeCurrency: {
                      name: "MATIC",
                      symbol: "MATIC",
                      decimals: 18,
                    },
                    // @ts-ignore
                    rpcUrls: rpcUrl,
                    blockExplorerUrls: ["https://polygonscan.io/"],
                  },
                ],
              });
            }
            return false;
          }
        }
      }
    };
    checkNetwork();
  }, []);

  return (
    <Router history={history}>
      <ConnectWalletModal
        login={login}
        handleClose={handleConnectWalletClose}
        open={open}
      />
      <Menu handleConnectWalletModalOpen={handleConnectWalletOpen} />
      <Switch>
        <Route path="/buy-tokens/" exact>
          <Presale handleConnectWalletModalOpen={handleConnectWalletOpen} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
