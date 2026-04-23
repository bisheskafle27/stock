"use client";

import { useState } from "react";
import PortfolioTable from "@/components/PortfolioTable";
import AddStockModal from "@/components/AddStockModal";

export default function Portfolio() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Stock Portfolio</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
        >
          + Add Stock
        </button>
      </div>
      <PortfolioTable />
      <AddStockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </main>
  );
}
