import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PortfolioStock } from "../lib/api";

interface PortfolioState {
  portfolio: PortfolioStock[];
  addStock: (stock: Omit<PortfolioStock, "id" | "currentPrice">) => void;
  updateStock: (id: string, updatedStock: Partial<PortfolioStock>) => void;
  deleteStock: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      // Default to initial mock data if empty
      portfolio: [
        {
          id: "1",
          ticker: "AAPL",
          companyName: "Apple Inc.",
          quantity: 15,
          purchasePrice: 145.0,
          currentPrice: 170.5,
          purchaseDate: "2026-01-10",
        },
        {
          id: "2",
          ticker: "MSFT",
          companyName: "Microsoft Corp.",
          quantity: 10,
          purchasePrice: 310.0,
          currentPrice: 380.2,
          purchaseDate: "2026-02-15",
        },
      ],
      addStock: (stock) =>
        set((state) => {
          const newStock: PortfolioStock = {
            ...stock,
            id: Math.random().toString(36).substring(2, 9),
            currentPrice:
              stock.purchasePrice * (1 + (Math.random() * 0.1 - 0.05)),
          };
          return { portfolio: [...state.portfolio, newStock] };
        }),
      updateStock: (id, updatedStock) =>
        set((state) => ({
          portfolio: state.portfolio.map((s) =>
            s.id === id ? { ...s, ...updatedStock } : s,
          ),
        })),
      deleteStock: (id) =>
        set((state) => ({
          portfolio: state.portfolio.filter((s) => s.id !== id),
        })),
    }),
    {
      name: "portfolio-storage",
    },
  ),
);
