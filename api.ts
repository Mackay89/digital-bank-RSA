import axios from 'axios';
import { User, Transaction, TokenBalance, MonitoringMetric } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  register: async (email: string, password: string, name: string) => {
    const { data } = await api.post('/auth/register', { email, password, name });
    return data;
  },
};

export const transactions = {
  getAll: async (): Promise<Transaction[]> => {
    const { data } = await api.get('/transactions');
    return data;
  },
  create: async (transaction: Omit<Transaction, 'id' | 'timestamp' | 'status'>) => {
    const { data } = await api.post('/transactions', transaction);
    return data;
  },
};

export const tokens = {
  getBalances: async (): Promise<TokenBalance[]> => {
    const { data } = await api.get('/tokens/balances');
    return data;
  },
};

export const monitoring = {
  getMetrics: async (timeframe: string): Promise<MonitoringMetric[]> => {
    const { data } = await api.get(`/monitoring/metrics?timeframe=${timeframe}`);
    return data;
  },
};