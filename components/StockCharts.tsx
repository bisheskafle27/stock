"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchStockData } from "../lib/api";

export default function StockCharts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["stockData", "AAPL"],
    queryFn: () => fetchStockData("AAPL"),
  });

  if (isLoading)
    return <div className="p-4 text-center">Loading stock data...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">Error loading data</div>
    );
  if (!data) return null;

  const categories = data.map((d) => d.date);
  const prices = data.map((d) => d.price);
  const volumes = data.map((d) => d.volume);

  const priceChartOptions: Highcharts.Options = {
    title: {
      text: "Stock Price Trend (Mock AAPL)",
    },
    xAxis: {
      categories,
      title: { text: "Date" },
    },
    yAxis: {
      title: {
        text: "Price (USD)",
      },
    },
    series: [
      {
        type: "line",
        name: "Price",
        data: prices,
        color: "#2563eb",
      },
    ],
    credits: { enabled: false },
  };

  const volumeChartOptions: Highcharts.Options = {
    title: {
      text: "Volume Traded (Mock AAPL)",
    },
    xAxis: {
      categories,
      title: { text: "Date" },
    },
    yAxis: {
      title: {
        text: "Volume",
      },
    },
    series: [
      {
        type: "column",
        name: "Volume",
        data: volumes,
        color: "#16a34a",
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto p-4">
      <div className="border rounded-lg shadow-sm p-4 bg-white">
        <HighchartsReact highcharts={Highcharts} options={priceChartOptions} />
      </div>
      <div className="border rounded-lg shadow-sm p-4 bg-white">
        <HighchartsReact highcharts={Highcharts} options={volumeChartOptions} />
      </div>
    </div>
  );
}
