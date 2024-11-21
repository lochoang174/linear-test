import { useState } from "react";
import { useBlockchain } from "@/hooks/useBlockchain";
import { TransactionHistory } from "@/components/TransactionHistory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Loader, Moon, Sun, X, Copy } from "lucide-react";
import { WalletSelector as AntdWalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

import { Switch } from "@/components/ui/switch";

import { shortenAddress } from "@/lib/functions";


export default function BlockchainInterface() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState(0);
  
  const {
    balance,
    listHistory,
    transactionState,
    handleTransfer,
    getTransactionHistory,
    account,
    connected,
  } = useBlockchain();

  const { isLoading, txStatus, txResult } = transactionState;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleTransfer(destination, amount);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Card
        className={`max-w-md mx-auto ${
          isDarkMode ? "bg-gray-800 text-white" : ""
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          {/* <CardTitle className="text-2xl font-bold">
            Blockchain Interface
          </CardTitle> */}
          <img src="/logo.png" alt="aptos" className="w-[140px] h-[80px]" />
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <label htmlFor="dark-mode" className="sr-only">
              Toggle dark mode
            </label>
            {isDarkMode ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!connected ? (
            <Button
              className={`w-full text-white `}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <AntdWalletSelector />
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Connected Account
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {shortenAddress(account?.address ?? "")}
                  </p>
                  <button
                    onClick={() => copyToClipboard(account?.address ?? "")}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Balance
                </h3>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {balance} APT
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Destination Address
                  </label>
                  <Input
                    type="text"
                    id="destination"
                    placeholder="0x..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Amount (APT)
                  </label>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="0.0"
                    required
                    className="mt-1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    "Transfer"
                  )}
                </Button>
              </form>
              {txStatus && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Transaction Status
                  </h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {txStatus}
                  </p>
                </div>
              )}
              {txResult && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Transaction Result
                  </h3>
                  <p
                    className={`mt-1 text-sm flex items-center ${
                      txResult === "Success"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {txResult === "Success" ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <X className="mr-2 h-4 w-4" />
                    )}
                    {txResult}
                  </p>
                </div>
              )}
              <TransactionHistory
                isDarkMode={isDarkMode}
                listHistory={listHistory}
                onGetTransactions={getTransactionHistory}
                onCopyToClipboard={copyToClipboard}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
