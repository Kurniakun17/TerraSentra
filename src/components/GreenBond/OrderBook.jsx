import React from "react";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";

export default function OrderBook() {
  // Mock data for recent purchases
  const recentTransactions = [
    {
      id: 1,
      user: "Bambang S",
      type: "buy",
      amount: 5,
      value: 10000000,
      timestamp: "2025-04-04T08:30:00",
    },
    {
      id: 2,
      user: "Ratna K",
      type: "buy",
      amount: 2,
      value: 4000000,
      timestamp: "2025-04-03T15:45:00",
    },
    {
      id: 3,
      user: "PT Maju Bersama",
      type: "buy",
      amount: 20,
      value: 40000000,
      timestamp: "2025-04-03T10:15:00",
    },
    {
      id: 4,
      user: "Yayasan Hijau",
      type: "buy",
      amount: 10,
      value: 20000000,
      timestamp: "2025-04-02T14:20:00",
    },
    {
      id: 5,
      user: "Indra P",
      type: "buy",
      amount: 1,
      value: 2000000,
      timestamp: "2025-04-01T09:10:00",
    },
  ];

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-green-600" />
        Recent Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Investor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Units
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date & Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {transaction.user[0].toUpperCase() + "xxxxxxxx" + transaction.user[transaction.user.length - 1]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === "buy"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type === "buy" ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {transaction.amount} units
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {formatCurrency(transaction.value)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(transaction.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-green-600 hover:text-green-800 font-medium">
          View all transactions
        </button>
      </div>
    </div>
  );
}
