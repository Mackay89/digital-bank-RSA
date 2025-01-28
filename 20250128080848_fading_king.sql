/*
  # Initial Schema Setup for Digital Banking System

  1. New Tables
    - `users`
      - Core user information and authentication
      - Includes KYC status and wallet details
    - `transactions`
      - All financial transactions
      - Includes blockchain and settlement details
    - `balances`
      - User balances across different currencies
      - Tracks fiat, crypto, and CBDC balances
    - `exchange_rates`
      - Current and historical exchange rates
      - Used for currency conversion
    - `tax_records`
      - Transaction tax information
      - Supports multiple jurisdictions

  2. Security
    - Enable RLS on all tables
    - Policies for user data access
    - Encryption for sensitive data
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  encrypted_password text NOT NULL,
  full_name text,
  kyc_status text DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  wallet_address text,
  layer2_enabled boolean DEFAULT false,
  preferred_network text DEFAULT 'ethereum',
  preferred_settlement text DEFAULT 'rtp',
  mfa_enabled boolean DEFAULT false,
  mfa_secret text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  type text NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'transfer')),
  amount numeric NOT NULL,
  currency text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  blockchain text,
  hash text,
  settlement_type text,
  from_address text,
  to_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Balances table
CREATE TABLE IF NOT EXISTS balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  currency text NOT NULL,
  amount numeric DEFAULT 0,
  type text CHECK (type IN ('fiat', 'crypto', 'cbdc')),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own balances"
  ON balances
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own balances"
  ON balances
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Exchange rates table
CREATE TABLE IF NOT EXISTS exchange_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_currency text NOT NULL,
  to_currency text NOT NULL,
  rate numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read exchange rates"
  ON exchange_rates
  FOR SELECT
  TO authenticated
  USING (true);

-- Tax records table
CREATE TABLE IF NOT EXISTS tax_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  transaction_id uuid REFERENCES transactions(id),
  jurisdiction text NOT NULL,
  tax_rate numeric NOT NULL,
  tax_amount numeric NOT NULL,
  category text NOT NULL,
  year integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tax_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own tax records"
  ON tax_records
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_balances_user_id ON balances(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_records_user_id ON tax_records(user_id);
CREATE INDEX IF NOT EXISTS idx_exchange_rates_currencies ON exchange_rates(from_currency, to_currency);