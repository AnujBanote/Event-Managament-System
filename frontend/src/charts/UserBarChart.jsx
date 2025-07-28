// src/charts/UserBarChart.jsx

import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function UserBarChart({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="text-gray-500 text-center italic">
        No user registration data available.
      </p>
    );
  }

  // Sort by date (ascending)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = {
    labels: sortedData.map((d) =>
      new Date(d.date).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      })
    ),
    datasets: [
      {
        label: "👤 Registrations",
        data: sortedData.map((d) => d.count),
        backgroundColor: "#4A90E2", // Consistent blue
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "User Registrations Over Time",
        font: { size: 18 },
        color: "#000000",
        padding: { top: 10, bottom: 15 },
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#FFFFFF",
        titleColor: "#000000",
        bodyColor: "#000000",
        borderColor: "#B6B09F",
        borderWidth: 1,
        cornerRadius: 6,
        callbacks: {
          label: (ctx) => ` ${ctx.raw} users`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: "Date",
          color: "#000000",
          font: { weight: "bold" },
        },
        ticks: { color: "#000000" },
      },
      y: {
        beginAtZero: true,
        grid: { borderDash: [4] },
        title: {
          display: true,
          text: "Registrations",
          color: "#000000",
          font: { weight: "bold" },
        },
        ticks: {
          stepSize: 1,
          color: "#000000",
        },
      },
    },
  };

  return (
    <div className="w-full h-[250px]">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default UserBarChart;
