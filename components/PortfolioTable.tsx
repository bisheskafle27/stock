"use client";

import React, { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { PortfolioStock } from "../lib/api";
import EditStockModal from "./EditStockModal";
import { usePortfolioStore } from "../store/usePortfolioStore";

const columnHelper = createColumnHelper<PortfolioStock>();

const columns = [
  columnHelper.accessor("ticker", {
    header: "Ticker",
    cell: (info) => (
      <span className="font-bold text-gray-900">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("companyName", {
    header: "Company Name",
    cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => (
      <span className="font-medium text-gray-800">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("purchasePrice", {
    header: "Purchase Price",
    cell: (info) => (
      <span className="text-gray-800">${info.getValue().toFixed(2)}</span>
    ),
  }),
  columnHelper.accessor("currentPrice", {
    header: "Current Price",
    cell: (info) => (
      <span className="text-gray-800">${info.getValue().toFixed(2)}</span>
    ),
  }),
  columnHelper.display({
    id: "profitLoss",
    header: "Profit / Loss",
    cell: (info) => {
      const stock = info.row.original;
      const profitLoss =
        (stock.currentPrice - stock.purchasePrice) * stock.quantity;
      const percentGainTitle =
        ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) *
        100;
      const isProfit = profitLoss >= 0;

      return (
        <span
          className={`font-semibold ${isProfit ? "text-green-600" : "text-red-600"}`}
        >
          {isProfit ? "+" : "-"}${Math.abs(profitLoss).toFixed(2)} (
          {isProfit ? "+" : ""}
          {percentGainTitle.toFixed(2)}%)
        </span>
      );
    },
  }),
];

export default function PortfolioTable() {
  const [editingStock, setEditingStock] = useState<PortfolioStock | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { portfolio, deleteStock } = usePortfolioStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const tableColumns = React.useMemo(
    () => [
      ...columns,
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const stock = info.row.original;
          return (
            <div className="flex space-x-3">
              <button
                onClick={() => setEditingStock(stock)}
                className="text-blue-600 hover:text-blue-900 font-medium text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (
                    confirm(`Are you sure you want to delete ${stock.ticker}?`)
                  ) {
                    deleteStock(stock.id);
                  }
                }}
                className="text-red-600 hover:text-red-900 font-medium text-sm"
              >
                Delete
              </button>
            </div>
          );
        },
      }),
    ],
    [deleteStock],
  );

  const table = useReactTable({
    data: portfolio,
    columns: tableColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!mounted) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading portfolio data...
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-8">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer select-none hover:bg-gray-100"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {portfolio.length === 0 && (
        <div className="text-center py-10 bg-white border-t border-gray-200 text-gray-500">
          No stocks found in your portfolio.
        </div>
      )}
      {editingStock && (
        <EditStockModal
          isOpen={true}
          onClose={() => setEditingStock(null)}
          stock={editingStock}
        />
      )}
    </div>
  );
}
