import React, { useState } from 'react';
import { Activity, ArrowDown, ArrowUp, RotateCw, Download, Coins, Send, RefreshCw } from 'lucide-react';

export function MainComponent() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [balance, setBalance] = useState("50,000.00");
  const [tokenBalance, setTokenBalance] = useState("1,000.00");
  const [transactions] = useState([
    {
      id: 1,
      type: "deposit",
      amount: "1,000.00",
      date: "2025-01-15",
      status: "completed",
      blockchain: "Ethereum",
      hash: "0x1234...5678",
      settlementType: "RTP",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: "500.00",
      date: "2025-01-14",
      status: "completed",
      blockchain: "Polygon",
      hash: "0x8765...4321",
      settlementType: "SEPA Instant",
    },
    {
      id: 3,
      type: "transfer",
      amount: "2,000.00",
      date: "2025-01-13",
      status: "pending",
      blockchain: "Ethereum",
      hash: "0x9876...1234",
      settlementType: "RTP",
    },
  ]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [taxData] = useState({
    totalTaxable: "25,000.00",
    estimatedTax: "5,250.00",
    transactions: 156,
    globalRates: {
      US: 0.21,
      EU: 0.2,
      UK: 0.19,
      JP: 0.23,
    },
    stablecoinGains: "150.00",
  });
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showMfaModal, setShowMfaModal] = useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState("ethereum");
  const [layer2Enabled, setLayer2Enabled] = useState(false);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("eth");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [exchangeRates] = useState({
    eth: 2500.0,
    btc: 45000.0,
    usdc: 1.0,
    eurCBDC: 1.08,
    cnyeCBDC: 0.14,
    usdcStable: 1.0,
    usdtStable: 1.0,
    daiStable: 1.0,
  });
  const [selectedSettlement, setSelectedSettlement] = useState("rtp");
  const [selectedStablecoin, setSelectedStablecoin] = useState("usdc");
  const [selectedCBDC, setSelectedCBDC] = useState("eurCBDC");

  const renderSettings = () => (
    <div className="w-full p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 font-roboto">
          Security Settings
        </h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">Two-Factor Authentication</h3>
            <div className="flex items-center mt-2">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={mfaEnabled}
                    onChange={() => setShowMfaModal(true)}
                  />
                  <div
                    className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${mfaEnabled ? "bg-[#2563eb]" : ""}`}
                  ></div>
                  <div
                    className={`absolute w-4 h-4 bg-white rounded-full shadow top-1 left-1 transition ${mfaEnabled ? "transform translate-x-4" : ""}`}
                  ></div>
                </div>
                <span className="ml-2">Enable 2FA</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="w-full p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => handleBalanceClick("fiat")}
        >
          <h2 className="text-2xl font-bold mb-4 font-roboto flex items-center justify-between">
            Fiat Balance
            <RefreshCw className="w-6 h-6 hover:rotate-180 transition-transform duration-300" />
          </h2>
          <p className="text-4xl font-bold text-[#2563eb]">${balance}</p>
          <div className="mt-4 text-sm text-gray-600">
            <p>Available for withdrawal</p>
            <p className="mt-1">
              Settlement: {selectedSettlement.toUpperCase()}
            </p>
          </div>
        </div>
        <div
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => handleBalanceClick("token")}
        >
          <h2 className="text-2xl font-bold mb-4 font-roboto flex items-center justify-between">
            Token Balance
            <RefreshCw className="w-6 h-6 hover:rotate-180 transition-transform duration-300" />
          </h2>
          <p className="text-4xl font-bold text-[#2563eb]">
            ${tokenBalance} {selectedStablecoin.toUpperCase()}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Network:{" "}
              {selectedBlockchain.charAt(0).toUpperCase() +
                selectedBlockchain.slice(1)}
            </p>
            <p className="mt-1">
              Layer 2: {layer2Enabled ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>
        <div
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => handleBalanceClick("cbdc")}
        >
          <h2 className="text-2xl font-bold mb-4 font-roboto flex items-center justify-between">
            CBDC Balance
            <RefreshCw className="w-6 h-6 hover:rotate-180 transition-transform duration-300" />
          </h2>
          <p className="text-4xl font-bold text-[#2563eb]">
            {selectedCBDC === "eurCBDC" ? "€" : "¥"}
            {(parseFloat(balance) * exchangeRates[selectedCBDC]).toFixed(2)}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Type:{" "}
              {selectedCBDC === "eurCBDC" ? "Digital Euro" : "Digital Yuan"}
            </p>
            <p className="mt-1">Status: Active</p>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleButtonClick("send")}
            className="bg-[#2563eb] text-white p-4 rounded-lg hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-opacity-50 flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Money
          </button>
          <button
            onClick={() => handleButtonClick("receive")}
            className="bg-[#2563eb] text-white p-4 rounded-lg hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-opacity-50 flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Receive Money
          </button>
          <button
            onClick={() => handleButtonClick("exchange")}
            className="bg-[#2563eb] text-white p-4 rounded-lg hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-opacity-50 flex items-center justify-center"
          >
            <RotateCw className="w-5 h-5 mr-2" />
            Exchange
          </button>
          <button
            onClick={() => handleButtonClick("buy")}
            className="bg-[#2563eb] text-white p-4 rounded-lg hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-opacity-50 flex items-center justify-center"
          >
            <Coins className="w-5 h-5 mr-2" />
            Buy Tokens
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 font-roboto">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Blockchain</th>
                <th className="text-left p-2">Settlement</th>
                <th className="text-left p-2">Hash</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    {tx.type === "deposit" ? (
                      <ArrowDown className="w-5 h-5 inline mr-2 text-green-500" />
                    ) : tx.type === "withdrawal" ? (
                      <ArrowUp className="w-5 h-5 inline mr-2 text-red-500" />
                    ) : (
                      <RotateCw className="w-5 h-5 inline mr-2 text-blue-500" />
                    )}
                    {tx.type}
                  </td>
                  <td className="p-2">${tx.amount}</td>
                  <td className="p-2">{tx.date}</td>
                  <td className="p-2">{tx.blockchain}</td>
                  <td className="p-2">{tx.settlementType}</td>
                  <td className="p-2">
                    <span className="text-sm font-mono">{tx.hash}</span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        tx.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBlockchain = () => (
    <div className="w-full p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 font-roboto">
          Blockchain Settings
        </h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">Network Selection</h3>
            <select
              className="mt-2 p-2 border rounded"
              value={selectedBlockchain}
              onChange={(e) => setSelectedBlockchain(e.target.value)}
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="optimism">Optimism</option>
            </select>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">Settlement Method</h3>
            <select
              className="mt-2 p-2 border rounded"
              value={selectedSettlement}
              onChange={(e) => setSelectedSettlement(e.target.value)}
            >
              <option value="rtp">RTP (Real-Time Payments)</option>
              <option value="sepa">SEPA Instant</option>
              <option value="cbdc">CBDC Settlement</option>
            </select>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">Stablecoin Selection</h3>
            <select
              className="mt-2 p-2 border rounded"
              value={selectedStablecoin}
              onChange={(e) => setSelectedStablecoin(e.target.value)}
            >
              <option value="usdc">USDC</option>
              <option value="usdt">USDT</option>
              <option value="dai">DAI</option>
            </select>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">CBDC Network</h3>
            <select
              className="mt-2 p-2 border rounded"
              value={selectedCBDC}
              onChange={(e) => setSelectedCBDC(e.target.value)}
            >
              <option value="eurCBDC">Digital Euro</option>
              <option value="cnyeCBDC">Digital Yuan</option>
            </select>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">Layer-2 Optimization</h3>
            <div className="flex items-center mt-2">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={layer2Enabled}
                    onChange={() => setLayer2Enabled(!layer2Enabled)}
                  />
                  <div
                    className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${
                      layer2Enabled ? "bg-[#2563eb]" : ""
                    }`}
                  ></div>
                  <div
                    className={`absolute w-4 h-4 bg-white rounded-full shadow top-1 left-1 transition ${
                      layer2Enabled ? "transform translate-x-4" : ""
                    }`}
                  ></div>
                </div>
                <span className="ml-2">Enable Layer-2 Scaling</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTaxes = () => (
    <div className="w-full p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 font-roboto">Tax Reports</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold">Total Taxable Amount</h3>
              <p className="text-2xl font-bold text-[#2563eb]">
                ${taxData.totalTaxable}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold">Estimated Tax</h3>
              <p className="text-2xl font-bold text-[#2563eb]">
                ${taxData.estimatedTax}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold">Stablecoin Gains</h3>
              <p className="text-2xl font-bold text-[#2563eb]">
                ${taxData.stablecoinGains}
              </p>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold mb-4">Global Tax Rates</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(taxData.globalRates).map(([country, rate]) => (
                <div key={country} className="p-2 bg-gray-50 rounded">
                  <p className="font-bold">{country}</p>
                  <p>{(rate * 100).toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">2025 Annual Report</h3>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-2">
              <button
                onClick={() => window.open("/download-report", "_blank")}
                className="bg-[#2563eb] text-white px-6 py-3 rounded-lg hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-colors flex items-center justify-center w-full md:w-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Report
              </button>
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.checked) {
                          window.open("/subscribe-updates", "_blank");
                        }
                      }}
                    />
                    <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner peer-checked:bg-[#2563eb]"></div>
                    <div className="absolute w-4 h-4 bg-white rounded-full shadow top-1 left-1 transition peer-checked:translate-x-4"></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    Get updates when new reports are available
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrencyConverter = () => {
    const handleConvert = () => {
      if (!fromAmount) return;

      let result;
      if (fromCurrency === "usd") {
        result = parseFloat(fromAmount) / exchangeRates[toCurrency];
      } else if (toCurrency === "usd") {
        result = parseFloat(fromAmount) * exchangeRates[fromCurrency];
      } else {
        const usdAmount = parseFloat(fromAmount) * exchangeRates[fromCurrency];
        result = usdAmount / exchangeRates[toCurrency];
      }

      setToAmount(result.toFixed(8));

      if (fromCurrency === "usd") {
        const newBalance = (
          parseFloat(balance.replace(/,/g, "")) - parseFloat(fromAmount)
        ).toFixed(2);
        setBalance(newBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
    };

    return (
      <div className="w-full p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 font-roboto">
            Currency Converter
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">From</label>
                <select
                  className="w-full p-2 border rounded"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  <option value="usd">USD</option>
                  <option value="eth">ETH</option>
                  <option value="btc">BTC</option>
                  <option value="usdc">USDC</option>
                </select>
                <input
                  type="number"
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="Amount"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">To</label>
                <select
                  className="w-full p-2 border rounded"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  <option value="eth">ETH</option>
                  <option value="btc">BTC</option>
                  <option value="usdc">USDC</option>
                  <option value="usd">USD</option>
                </select>
                <input
                  type="number"
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="Converted Amount"
                  value={toAmount}
                  disabled
                />
              </div>
            </div>
            <button
              className="w-full bg-[#2563eb] text-white p-2 rounded hover:bg-[#1d4ed8]"
              onClick={handleConvert}
            >
              Convert
            </button>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-2">Current Exchange Rates (USD)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600">ETH</p>
                  <p className="font-bold">
                    ${exchangeRates.eth.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">BTC</p>
                  <p className="font-bold">
                    ${exchangeRates.btc.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">USDC</p>
                  <p className="font-bold">
                    ${exchangeRates.usdc.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSendMoney = () => {
    const amount = prompt("Enter amount to send:");
    if (amount && !isNaN(amount)) {
      const newBalance = (
        parseFloat(balance.replace(/,/g, "")) - parseFloat(amount)
      ).toFixed(2);
      setBalance(newBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      const newTransaction = {
        id: transactions.length + 1,
        type: "withdrawal",
        amount: parseFloat(amount).toFixed(2),
        date: new Date().toISOString().split("T")[0],
        status: "completed",
        blockchain:
          selectedBlockchain.charAt(0).toUpperCase() +
          selectedBlockchain.slice(1),
        hash:
          "0x" +
          Math.random().toString(16).slice(2, 10) +
          "..." +
          Math.random().toString(16).slice(2, 6),
        settlementType: selectedSettlement.toUpperCase(),
      };
      transactions.unshift(newTransaction);
    }
  };

  const handleReceiveMoney = () => {
    const amount = prompt("Enter amount to receive:");
    if (amount && !isNaN(amount)) {
      const newBalance = (
        parseFloat(balance.replace(/,/g, "")) + parseFloat(amount)
      ).toFixed(2);
      setBalance(newBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      const newTransaction = {
        id: transactions.length + 1,
        type: "deposit",
        amount: parseFloat(amount).toFixed(2),
        date: new Date().toISOString().split("T")[0],
        status: "completed",
        blockchain:
          selectedBlockchain.charAt(0).toUpperCase() +
          selectedBlockchain.slice(1),
        hash:
          "0x" +
          Math.random().toString(16).slice(2, 10) +
          "..." +
          Math.random().toString(16).slice(2, 6),
        settlementType: selectedSettlement.toUpperCase(),
      };
      transactions.unshift(newTransaction);
    }
  };

  const handleBuyTokens = () => {
    const amount = prompt("Enter amount of tokens to buy:");
    if (amount && !isNaN(amount)) {
      const newTokenBalance = (
        parseFloat(tokenBalance.replace(/,/g, "")) + parseFloat(amount)
      ).toFixed(2);
      setTokenBalance(newTokenBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      const newTransaction = {
        id: transactions.length + 1,
        type: "deposit",
        amount: parseFloat(amount).toFixed(2),
        date: new Date().toISOString().split("T")[0],
        status: "completed",
        blockchain:
          selectedBlockchain.charAt(0).toUpperCase() +
          selectedBlockchain.slice(1),
        hash:
          "0x" +
          Math.random().toString(16).slice(2, 10) +
          "..." +
          Math.random().toString(16).slice(2, 6),
        settlementType: "TOKEN PURCHASE",
      };
      transactions.unshift(newTransaction);
    }
  };

  const handleButtonClick = (action) => {
    switch (action) {
      case "send":
        handleSendMoney();
        break;
      case "receive":
        handleReceiveMoney();
        break;
      case "exchange":
        setActiveTab("converter");
        break;
      case "buy":
        handleBuyTokens();
        break;
      default:
        break;
    }
  };

  const handleBalanceClick = (type) => {
    switch (type) {
      case "fiat":
        const newFiatBalance = parseFloat(balance.replace(/,/g, "")).toFixed(2);
        setBalance(newFiatBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        break;
      case "token":
        const newTokenBalance = parseFloat(
          tokenBalance.replace(/,/g, "")
        ).toFixed(2);
        setTokenBalance(newTokenBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        break;
      case "cbdc":
        const newBalance = parseFloat(balance.replace(/,/g, "")).toFixed(2);
        setBalance(newBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showMfaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              Enable Two-Factor Authentication
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter verification code"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowMfaModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setMfaEnabled(true);
                    setShowMfaModal(false);
                  }}
                  className="px-4 py-2 bg-[#2563eb] text-white rounded hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <header className="bg-[#2563eb] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-roboto">Digital Banking</h1>
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-2 hover:bg-[#1d4ed8] rounded transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Activity className="w-6 h-6" />
            </button>
            <nav className="hidden md:flex space-x-4">
              {[
                "dashboard",
                "blockchain",
                "converter",
                "taxes", "settings",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded transition-colors ${
                    activeTab === tab
                      ? "bg-white text-[#2563eb]"
                      : "hover:bg-[#1d4ed8] active:bg-[#1e40af]"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="md:hidden bg-[#2563eb] text-white">
          {["dashboard", "blockchain", "converter", "taxes", "settings"].map(
            (tab) => (
              <button
                key={tab}
                className="w-full p-4 text-left hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-colors"
                onClick={() => {
                  setActiveTab(tab);
                  setShowMobileMenu(false);
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ),
          )}
        </div>
      )}

      <main className="container mx-auto">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "taxes" && renderTaxes()}
        {activeTab === "settings" && renderSettings()}
        {activeTab === "blockchain" && renderBlockchain()}
        {activeTab === "converter" && renderCurrencyConverter()}
      </main>
    </div>
  );
}