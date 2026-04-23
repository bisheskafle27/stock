import { describe, it, expect, beforeEach } from "vitest";
import { usePortfolioStore } from "../store/usePortfolioStore";

describe("Portfolio Store", () => {
  beforeEach(() => {
    // Clear and reset the store state before each test
    usePortfolioStore.setState({
      portfolio: [],
    });
  });

  it("should start with an empty or default set if no persistent state", () => {
    const { portfolio } = usePortfolioStore.getState();
    expect(portfolio).toEqual([]);
  });

  it("should add a stock to the portfolio", () => {
    const stockInput = {
      ticker: "TEST",
      companyName: "Test Inc.",
      quantity: 10,
      purchasePrice: 100,
      purchaseDate: "2026-05-01",
    };

    usePortfolioStore.getState().addStock(stockInput);

    const { portfolio } = usePortfolioStore.getState();
    expect(portfolio).toHaveLength(1);
    expect(portfolio[0].ticker).toBe("TEST");
    expect(portfolio[0].quantity).toBe(10);
  });

  it("should edit a stock in the portfolio", () => {
    const stockInput = {
      ticker: "TEST",
      companyName: "Test Inc.",
      quantity: 10,
      purchasePrice: 100,
    };

    usePortfolioStore.getState().addStock(stockInput);
    const { portfolio } = usePortfolioStore.getState();
    const storedStockId = portfolio[0].id;

    // Perform Update
    usePortfolioStore.getState().updateStock(storedStockId, { quantity: 20 });

    const { portfolio: updatedPortfolio } = usePortfolioStore.getState();
    expect(updatedPortfolio[0].quantity).toBe(20);
    // Unchanged props should remain
    expect(updatedPortfolio[0].ticker).toBe("TEST");
  });

  it("should delete a stock from the portfolio", () => {
    const stockInput = {
      ticker: "DEL",
      companyName: "Delete Inc.",
      quantity: 1,
      purchasePrice: 50,
    };

    usePortfolioStore.getState().addStock(stockInput);
    let currentPortfolio = usePortfolioStore.getState().portfolio;
    const storedStockId = currentPortfolio[0].id;

    usePortfolioStore.getState().deleteStock(storedStockId);

    currentPortfolio = usePortfolioStore.getState().portfolio;
    expect(currentPortfolio).toHaveLength(0);
  });
});
