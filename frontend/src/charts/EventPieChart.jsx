import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function EventPieChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="text-gray-500 text-center italic">
        No booking data available.
      </p>
    );
  }

  const sortedData = [...data].sort(
    (a, b) => b.bookingCount - a.bookingCount
  );

  const labels = sortedData.map((d) => d.Event?.title || "Untitled");
  const values = sortedData.map((d) => d.bookingCount);

  const backgroundColors = [
    "#60A5FA", "#34D399", "#FBBF24", "#F87171",
    "#A78BFA", "#F472B6", "#FDBA74", "#86EFAC",
    "#FCA5A5", "#D8B4FE", "#FCD34D", "#BFDBFE",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Bookings",
        data: values,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Event Bookings Distribution",
        color: "#000000",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#000000",
        bodyColor: "#000000",
        borderColor: "#B6B09F",
        borderWidth: 1,
      },
      legend: {
        position: "bottom",
        labels: {
          color: "#000000",
          padding: 12,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default EventPieChart;
