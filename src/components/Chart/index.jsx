/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { UserContext } from "../../context/UserContext";

const Chart = ({ first, second, third, fourth, id }) => {
  const [data, setData] = React.useState({});
  const { quarter } = React.useContext(UserContext);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/result/staff/${id}`, {
        headers: {
          "access-token": JSON.parse(localStorage.getItem("staffInfo")).token,
        },
      })
      .then((response) => {
        setData(response.data.data[quarter][0]);
      });
  }, [id]);

  // const a = first ? first : 30;
  // const b = second ? second : 10;
  // const c = third ? third : 20;
  // const d = fourth ? fourth : 50;
  // const e = a + b + c + d;
  // const overall = e / 4;

  // const { firstQuarter, secondQuarter, thirdQuarter, fourthQuarter } = data;

  // first =
  //   firstQuarter &&
  //   firstQuarter.map(({ score }) => {
  //     return score;
  //   });
  // second =
  //   secondQuarter &&
  //   secondQuarter.map(({ score }) => {
  //     return score;
  //   });
  // third =
  //   thirdQuarter &&
  //   thirdQuarter.map(({ score }) => {
  //     return score;
  //   });
  // fourth =
  //   fourthQuarter &&
  //   fourthQuarter.map(({ score }) => {
  //     return score;
  //   });

  //   let totalScores = [
  //     first.length > 0 && first[0],
  //     second.length > 0 && second[0],
  //     third.length > 0 && third[0],
  //     fourth.length > 0 && fourth[0],
  //   ];
  //   const total = totalScores.reduce((a, b) => a + b, 0);

  const option = {
    tooltip: {
      trigger: "item",
    },

    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "KPI",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "20",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: data.score,
            name:
              quarter === "firstQuarter"
                ? "First Quarter"
                : quarter === "secondQuarter"
                ? "Second Quarter"
                : "Third Quarter",
          },

          // { value: 2, name: "Second Quarter" },
          // { value: 3, name: "Third Quarter" },
          // { value: 4, name: "Four Quarter" },
          //   { value: total, name: "Overall" },
        ],
      },
    ],
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: "0.5" }}>
      <ReactECharts
        option={option}
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
};

export default Chart;
