import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PropsWithChildren } from "react";
// import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
// Chạy lệnh sau để cài đặt FewchaWallet:
// npm install @fewchawallet/aptos-wallet-adapter
// import { FewchaWallet } from "fewcha-plugin-wallet-adapter";

import { Network } from "@aptos-labs/ts-sdk";
// import { MSafeWalletAdapter } from "@msafe/aptos-wallet-adapter";
export const WalletProvider = ({ children }: PropsWithChildren) => {
    // const { autoConnect } = useAutoConnect();
    // const { toast } = useToast();
  
  
    return (
      <AptosWalletAdapterProvider
        // plugins={wallets}
        autoConnect={false}
        dappConfig={{
          network: Network.TESTNET,
          aptosConnectDappId: "57fa42a9-29c6-4f1e-939c-4eefa36d9ff5",
          mizuwallet: {
            manifestURL:
              "https://assets.mz.xyz/static/config/mizuwallet-connect-manifest.json",
          },
        }}
        // onError={(error) => {
        //   toast({
        //     variant: "destructive",
        //     title: "Error",
        //     description: error || "Unknown wallet error",
        //   });
        // }}
      >
        {children}
      </AptosWalletAdapterProvider>
    );
  };