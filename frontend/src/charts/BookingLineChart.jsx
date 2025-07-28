import React, { memo } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function BookingLineChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500 italic">
        No booking trend data available.
      </div>
    );
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = {
    labels: sortedData.map((d) =>
      new Date(d.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "Bookings Over Time",
        data: sortedData.map((d) => d.count),
        borderColor: "#000000",
        backgroundColor: "rgba(182, 176, 159, 0.3)", // Stone Gray fill
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#000000",
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Bookings Over Time",
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
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#000000",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "#FFFFFF",
        borderColor: "#B6B09F",
        borderWidth: 1,
        titleColor: "#000000",
        bodyColor: "#000000",
        callbacks: {
          label: (context) => `${context.parsed.y} Bookings`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Bookings Count",
          color: "#000000",
        },
        ticks: {
          color: "#000000",
        },
        grid: {
          drawTicks: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          color: "#000000",
        },
        ticks: {
          color: "#000000",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px]" role="img" aria-label="Line chart showing bookings over time">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default memo(BookingLineChart);
