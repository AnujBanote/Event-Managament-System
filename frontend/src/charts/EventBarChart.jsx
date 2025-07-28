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

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function EventBarChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-gray-500 italic">No event booking data available.</p>;
  }

  const sortedData = [...data].sort((a, b) => b.bookingCount - a.bookingCount);

  const chartData = {
    labels: sortedData.map((d) => d.Event?.title || "Untitled Event"),
    datasets: [
      {
        label: "Bookings per Event",
        data: sortedData.map((d) => d.bookingCount),
        backgroundColor: "#B6B09F", // Stone Gray
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Bookings Per Event",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#000000",
        padding: { top: 10, bottom: 10 },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#000000",
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "#FFFFFF",
        borderColor: "#B6B09F",
        borderWidth: 1,
        titleColor: "#000000",
        bodyColor: "#000000",
        callbacks: {
          label: (context) => `${context.raw} Bookings`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Bookings",
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
          text: "Event",
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
    <div className="w-full h-[300px]" aria-label="Bar chart showing bookings per event" role="img">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default EventBarChart;
