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
