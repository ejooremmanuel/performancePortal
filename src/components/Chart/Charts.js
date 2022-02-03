import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export default function DouChart(props) {
  const data = {
    labels: [
      "Apprasial Score",
      "Manager Rating",
      "Overall Rating",
      "HR Callibration",
    ],
    datasets: [
      {
        data: [
          props.apprasialScore,
          props.managerRating,
          props.overallRating,
          props.hrCallibration,
        ],
        backgroundColor: ["teal", "purple", "orange", "coral", "cyan"],
        border: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
