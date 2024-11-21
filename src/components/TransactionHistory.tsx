import { Clock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HistoryType } from "@/types/blockchain";

interface TransactionHistoryProps {
  isDarkMode: boolean;
  listHistory: HistoryType[];
  onGetTransactions: () => void;
  onCopyToClipboard: (text: string) => void;
}

export function TransactionHistory({
  isDarkMode,
  listHistory,
  onGetTransactions,
  onCopyToClipboard,
}: TransactionHistoryProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full"
          onClick={onGetTransactions}
        >
          <Clock className="mr-2 h-4 w-4" />
          Transaction History
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] ${
          isDarkMode ? "bg-gray-800 text-white" : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle>Transaction History</DialogTitle>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto">
          {listHistory.length === 0 ? (
            <p className="text-center text-gray-500">No transactions found</p>
          ) : (
            listHistory.map((item, index) => (
              <div
                key={index}
                className="mb-4 rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center justify-between">
                  <a
                    href={`https://explorer.aptoslabs.com/txn/${item.hash}?network=testnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:text-blue-600 break-all"
                  >
                    {item.hash}
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCopyToClipboard(item.hash)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  {item.time}
                </p>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 