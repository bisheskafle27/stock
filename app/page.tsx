import StockCharts from '@/components/StockCharts';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Stock Performance Dashboard</h1>
      <StockCharts />
    </main>
  );
}
