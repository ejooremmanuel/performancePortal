import React from 'react'
import ReactECharts from "echarts-for-react";

const Chart = ({ first, second, third, fourth }) => {
    const a = first ? first : 30
    const b = second ? second : 10
    const c = third ? third : 20
    const d = fourth ? fourth : 50
    const e = a + b + c + d
    const overall = e / 4

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
                    { value: first ? first : 30, name: "First Quarter" },
                    { value: second ? second : 20, name: "Second Quarter" },
                    { value: third ? third : 50, name: "Third Quarter" },
                    { value: fourth ? fourth : 10, name: "Four Quarter" },
                    { value: overall ? overall : 40, name: "Overall" },

                ],
            },
        ],
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", flex: "0.5" }}>
            <ReactECharts option={option} style={{ height: '500px', width: '100%' }} />
        </div>
    )
}

export default Chart
