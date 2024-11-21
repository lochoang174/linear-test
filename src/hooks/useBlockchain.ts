import { useState, useEffect } from 'react';
import { Aptos, Network, AptosConfig } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import { HistoryType, TransactionState } from '@/types/blockchain';
import { formatTimestamp } from '@/lib/functions';

export function useBlockchain() {
  const [transactionState, setTransactionState] = useState<TransactionState>({
    isLoading: false,
    txStatus: "",
    txResult: "",
  });
  const [balance, setBalance] = useState(0);
  const [listHistory, setListHistory] = useState<HistoryType[]>([]);
  
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const { toast } = useToast();
  const { account, connected, signTransaction, } = useWallet();

  useEffect(() => {
    if (connected) {
      getBalance();
    }
  }, [connected]);

  const getBalance = async () => {
    if (!account?.address) return;
    const tokens = await aptos.getAccountAPTAmount({
      accountAddress: account.address,
    });
    setBalance(tokens / 100000000);
  };

  const handleTransfer = async (destination: string, amount: number) => {
    if (!account?.address) return;
    
    setTransactionState(prev => ({ ...prev, isLoading: true, txStatus: "Pending" }));

    try {
      const transaction = await aptos.transferCoinTransaction({
        sender: account?.address,
        recipient: destination,
        amount: amount,
      });

      const senderAuthenticator = await signTransaction(transaction);
      const committedTransaction = await aptos.transaction.submit.simple({
        transaction,
        senderAuthenticator,
      });
      const executedTransaction = await aptos.waitForTransaction({
        transactionHash: committedTransaction.hash,
      });

      toast({
        title: "Transaction Complete",
        description: "Your transaction has been processed.",
        transactionHash: executedTransaction.hash,
      });

      setTransactionState({
        isLoading: false,
        txStatus: "Finalized",
        txResult: "Success",
      });
    } catch (error) {
      setTransactionState({
        isLoading: false,
        txStatus: "Failed",
        txResult: "Error",
      });
    }
  };

  const getTransactionHistory = async () => {
    if (!account?.address) return;
    const history = await aptos.getAccountTransactions({
      accountAddress: account?.address,
    });
    const formattedHistory: HistoryType[] = history.map((e) => ({
      hash: e.hash,
      time: formatTimestamp(e.timestamp),
    }));
    setListHistory(formattedHistory);
  };

  return {
    balance,
    listHistory,
    transactionState,
    handleTransfer,
    getTransactionHistory,
    account,
    connected,
  };
} 