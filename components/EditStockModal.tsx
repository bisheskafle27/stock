"use client";

import React, { useState, useEffect } from "react";
import { PortfolioStock } from "../lib/api";
import { usePortfolioStore } from "../store/usePortfolioStore";

interface EditStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: PortfolioStock | null;
}

export default function EditStockModal({
  isOpen,
  onClose,
  stock,
}: EditStockModalProps) {
  const updateStock = usePortfolioStore((state) => state.updateStock);
  const [ticker, setTicker] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (stock) {
      setTicker(stock.ticker);
      setCompanyName(stock.companyName);
      setQuantity(stock.quantity.toString());
      setPurchasePrice(stock.purchasePrice.toString());
      setPurchaseDate(stock.purchaseDate || "");
    }
  }, [stock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stock) return;
    setError("");

    const qty = Number(quantity);
    const price = Number(purchasePrice);

    if (!ticker || !companyName || !qty || !price) {
      setError("Please fill out all fields.");
      return;
    }
    if (qty <= 0 || price <= 0) {
      setError("Quantity and Price must be positive amounts.");
      return;
    }

    updateStock(stock.id, {
      ticker: ticker.toUpperCase(),
      companyName,
      quantity: qty,
      purchasePrice: price,
      purchaseDate,
    });

    onClose();
  };

  if (!isOpen || !stock) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Stock in Portfolio</h2>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ticker Symbol
            </label>
            <input
              type="text"
              required
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              placeholder="e.g. TSLA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              placeholder="e.g. Tesla, Inc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              required
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Purchase Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              required
              min="0"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Purchase
            </label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
