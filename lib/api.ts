export interface StockDataPoint {
  date: string;
  price: number;
  volume: number;
}

export const fetchStockData = async (
  symbol: string,
): Promise<StockDataPoint[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data for stock performance
  return [
    { date: "2026-04-10", price: 150.5, volume: 1000000 },
    { date: "2026-04-11", price: 152.0, volume: 1200000 },
    { date: "2026-04-12", price: 148.5, volume: 900000 },
    { date: "2026-04-13", price: 149.0, volume: 1100000 },
    { date: "2026-04-14", price: 155.0, volume: 1500000 },
    { date: "2026-04-15", price: 153.5, volume: 1300000 },
    { date: "2026-04-16", price: 158.0, volume: 1800000 },
    { date: "2026-04-17", price: 160.5, volume: 2000000 },
    { date: "2026-04-18", price: 159.0, volume: 1600000 },
    { date: "2026-04-19", price: 162.0, volume: 1900000 },
    { date: "2026-04-20", price: 165.5, volume: 2200000 },
    { date: "2026-04-21", price: 163.0, volume: 1700000 },
    { date: "2026-04-22", price: 168.0, volume: 2500000 },
    { date: "2026-04-23", price: 170.5, volume: 2800000 },
  ];
};

export interface PortfolioStock {
  id: string;
  ticker: string;
  companyName: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate?: string;
}

let portfolioData: PortfolioStock[] = [
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
  {
    id: "3",
    ticker: "GOOGL",
    companyName: "Alphabet Inc.",
    quantity: 20,
    purchasePrice: 135.5,
    currentPrice: 145.0,
    purchaseDate: "2026-03-20",
  },
  {
    id: "4",
    ticker: "AMZN",
    companyName: "Amazon.com, Inc.",
    quantity: 25,
    purchasePrice: 140.0,
    currentPrice: 138.5,
    purchaseDate: "2026-04-05",
  },
];

export const fetchPortfolio = async (): Promise<PortfolioStock[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...portfolioData];
};

export const addPortfolioStock = async (
  stock: Omit<PortfolioStock, "id" | "currentPrice">,
): Promise<PortfolioStock> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newStock: PortfolioStock = {
    ...stock,
    id: Math.random().toString(36).substring(2, 9),
    currentPrice: stock.purchasePrice * (1 + (Math.random() * 0.1 - 0.05)), // Mock current price based on purchase price +/- 5%
  };
  portfolioData.push(newStock);
  return newStock;
};

export const updatePortfolioStock = async (
  id: string,
  updatedStock: Partial<PortfolioStock>,
): Promise<PortfolioStock> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = portfolioData.findIndex((s) => s.id === id);
  if (index !== -1) {
    portfolioData[index] = { ...portfolioData[index], ...updatedStock };
    return portfolioData[index];
  }
  throw new Error("Stock not found");
};

export const deletePortfolioStock = async (id: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  portfolioData = portfolioData.filter((s) => s.id !== id);
  return id;
};
