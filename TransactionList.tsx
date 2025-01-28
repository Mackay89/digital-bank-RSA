import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { transactions } from '../lib/api';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

export const TransactionList = () => {
  const { data: transactionList } = useQuery({
    queryKey: ['transactions'],
    queryFn: transactions.getAll,
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownRight className="w-5 h-5 text-green-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {transactionList?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {getTransactionIcon(transaction.type)}
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(transaction.timestamp))} ago
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {transaction.amount} {transaction.currency}
                </p>
                <p
                  className={`text-sm ${
                    transaction.status === 'completed'
                      ? 'text-green-500'
                      : transaction.status === 'failed'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};