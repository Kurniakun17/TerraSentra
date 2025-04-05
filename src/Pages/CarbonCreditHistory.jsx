import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  DollarSign,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  X,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/LandingPage/Navbar";
import { formatCurrency } from "../utils/functions";
import { APIURL } from "../constant/type";

const CarbonCreditHistory = () => {
  const [timeframe, setTimeframe] = useState("30D");
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [priceData, setPriceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(APIURL + "/get-carbon-offset");
        const data = await response.json();
        
        // Format the data for the chart
        const formattedData = data.map(item => ({
          date: item.Date,
          price: parseFloat(item["Price (IDR)"]),
          open: parseFloat(item["Open (IDR)"]),
          high: parseFloat(item["High (IDR)"]),
          low: parseFloat(item["Low (IDR)"]),
          volume: item.Vol,
          changePercent: item["Change %"]
        }));
        
        setPriceData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load market data. Please try again.");
        // Use sample data in case of error
        setPriceData([
          { date: "Apr 03, 2025", price: 1085826.55, open: 1104131.68, high: 1104131.68, low: 1083330.4, volume: "0.85K", changePercent: "-3.60%" }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeframe]);

  // Calculate price change data
  const calculatePriceChangeData = () => {
    if (priceData.length === 0) return { percentChange: "0.00", priceChange: "0.00", isPositive: false, currentPrice: 0 };
    
    const sortedData = [...priceData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstPrice = sortedData[0].price;
    const latestPrice = sortedData[sortedData.length - 1].price;
    
    const priceChange = (latestPrice - firstPrice).toFixed(2);
    const percentChange = ((priceChange / firstPrice) * 100).toFixed(2);
    const isPositive = parseFloat(priceChange) > 0;
    
    return { 
      percentChange, 
      priceChange, 
      isPositive, 
      currentPrice: latestPrice.toFixed(2),
      latestDate: sortedData[sortedData.length - 1].date
    };
  };

  const { percentChange, priceChange, isPositive, currentPrice, latestDate } = calculatePriceChangeData();

  const timeframeOptions = ["7D", "30D", "90D", "1Y", "All"];

  const openTransactionModal = (type) => {
    setTransactionType(type);
    setAmount("");
    setPrice(currentPrice);
    setShowModal(true);
  };

  const calculateTotal = () => {
    if (!amount || !price) return 0;
    return (parseFloat(amount) * parseFloat(price)).toFixed(2);
  };

  // Updated transaction handler with react-hot-toast
  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    
    const loadingMessages = transactionType === "buy" 
      ? [
          "Securing carbon credits...",
          "Verifying market price...",
          "Processing your purchase...",
          "Finalizing transaction..."
        ]
      : [
          "Listing your credits...",
          "Finding buyers...",
          "Verifying market price...",
          "Processing your sale..."
        ];
    
    let messageIndex = 0;
    
    // Start with initial loading toast
    const toastId = toast.loading(loadingMessages[messageIndex]);
    
    // Update toast message every second to show progress
    const intervalId = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      toast.loading(loadingMessages[messageIndex], { id: toastId });
    }, 800);
    
    // Simulate API call
    setTimeout(() => {
      clearInterval(intervalId);
      
      // Show success message
      if(transactionType === "buy") {
        toast.success(
          `Successfully purchased ${amount} carbon credits for ${formatCurrency(calculateTotal())}!`, 
          { id: toastId, duration: 4000 }
        );
      } else {
        toast.success(
          `Successfully sold ${amount} carbon credits for ${formatCurrency(calculateTotal())}!`, 
          { id: toastId, duration: 4000 }
        );
      }
      
      setShowModal(false);
    }, 3500); // Simulate API delay
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" toastOptions={{
        success: {
          style: {
            background: '#10B981',
            color: 'white',
            fontWeight: 500,
          },
          iconTheme: {
            primary: 'white',
            secondary: '#10B981',
          },
        },
        error: {
          style: {
            background: '#EF4444',
            color: 'white',
            fontWeight: 500,
          },
          iconTheme: {
            primary: 'white',
            secondary: '#EF4444',
          },
        },
        loading: {
          style: {
            background: '#3B82F6',
            color: 'white',
            fontWeight: 500,
          },
        },
      }} />
      <div className="w-full h-24"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Carbon Credit Price History
            </h1>
            <p className="text-gray-500">
              Daily price tracking of voluntary carbon credit market
            </p>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              {timeframeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setTimeframe(option)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeframe === option
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button 
              className="ml-2 p-2 text-gray-600 hover:bg-gray-100 rounded-md" 
              onClick={() => {
                const toastId = toast.loading("Refreshing market data...");
                const fetchData = async () => {
                  setIsLoading(true);
                  try {
                    const response = await fetch(APIURL + "/get-carbon-offset");
                    const data = await response.json();
                    
                    // Format the data for the chart
                    const formattedData = data.map(item => ({
                      date: item.Date,
                      price: parseFloat(item["Price (IDR)"]),
                      open: parseFloat(item["Open (IDR)"]),
                      high: parseFloat(item["High (IDR)"]),
                      low: parseFloat(item["Low (IDR)"]),
                      volume: item.Vol,
                      changePercent: item["Change %"]
                    }));
                    
                    setPriceData(formattedData);
                    toast.success("Market data updated successfully!", { id: toastId });
                  } catch (error) {
                    console.error("Error fetching data:", error);
                    toast.error("Failed to refresh data. Please try again.", { id: toastId });
                  } finally {
                    setIsLoading(false);
                  }
                };
                fetchData();
              }}
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-6 justify-between">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <DollarSign size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Price</p>
                  <p className="text-xl font-bold">
                    {formatCurrency(currentPrice)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className={`${
                    isPositive ? "bg-green-100" : "bg-red-100"
                  } p-2 rounded-lg mr-3`}
                >
                  <TrendingUp
                    size={20}
                    className={isPositive ? "text-green-600" : "text-red-600"}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{timeframe} Change</p>
                  <p
                    className={`text-xl font-bold ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {formatCurrency(priceChange)} ({isPositive ? "+" : ""}
                    {percentChange}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Calendar size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-xl font-bold">
                    {latestDate || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => openTransactionModal("buy")}
                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <ArrowUpRight size={18} />
                Buy
              </button>
              <button
                onClick={() => openTransactionModal("sell")}
                className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <ArrowDownRight size={18} />
                Sell
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : (
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${formatCurrency(value, 0)}`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Price"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              <Filter size={16} className="mr-1" /> Filter
            </button>
            <button 
              className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              onClick={() => {
                toast.success("Data exported successfully!", {
                  icon: "📊",
                });
              }}
            >
              <Download size={16} className="mr-1" /> Export Data
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Source: Carbon Credit Market Index
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {transactionType === "buy" ? "Buy" : "Sell"} Carbon Credits
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitTransaction}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Amount (Credits)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Price per Credit (Rupiah)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div className="mb-6 bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span>Total Amount:</span>
                  <span className="font-bold">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full flex justify-center items-center py-2 px-4 rounded-md text-white font-medium ${
                  transactionType === "buy"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                <CreditCard size={18} className="mr-2" />
                Confirm {transactionType === "buy" ? "Purchase" : "Sale"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CarbonCreditHistory;