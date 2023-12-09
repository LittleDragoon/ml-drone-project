import React from "react";
import { LineChart } from "@/components/card/LineChart";

const OverlayComponent = ({ values }) => {
  const labels = Array.from(
    { length: values.deltaPiArray.length },
    (_, index) => `epoch-${index + 1}`
  );

  const chartData = (label, data) => ({
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Training Values",
      },
    },
  };

  return (
    <div className="flex-1 grid grid-cols-2 place-items-center overflow-y-auto">
      {Object.keys(values).map((key) => {
        return (
          <div className="h-full w-full" key={key}>
            <LineChart options={options} data={chartData(key, values[key])} />
          </div>
        );
      })}
    </div>
  );
};

export default OverlayComponent;
