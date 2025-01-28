export interface User {
  id: string;
  email: string;
  name: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  walletAddress?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  fromAddress?: string;
  toAddress?: string;
  taxInfo?: TaxInfo;
}

export interface TaxInfo {
  jurisdiction: string;
  taxRate: number;
  taxAmount: number;
  category: string;
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  usdValue: number;
}

export interface MonitoringMetric {
  timestamp: string;
  tps: number;
  latency: number;
  successRate: number;
  gasPrice?: string;
}