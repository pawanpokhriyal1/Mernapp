import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Legend } from "chart.js"
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ArcElement, Legend);
export const LineChart = () => {
    const labels = getLastYearMonths();
    const options = {
        responsive: true,
        plugins: {
            legend: {
                positions: "bottom"
            },
            title: {
                display: true,
                text: "Yearly view"
            }
        }
    }
    const data = {
        labels,
        datasets: [{
            label: "views",
            data: [1, 2.5, 3.3, 7.44, 14.5, 22.2, 32, 33, 56, 25, 63, 45],
            borderColor: "rgba(107,70,193,0.5)",
            backgroundColor: "#6b46c1"
        }]
    }
    return <Line options={options} data={data} />
}

export const DoughnutChart = () => {
    const labels = ["Subscribed", "Not Subscribed"];

    const data = {
        labels,
        datasets: [{
            label: "views",
            data: [3, 20],
            borderColor: ["rgba(62,12,171)", "rgba(214,43,129"],
            backgroundColor: ["rgba(62,12,171,0.3)", "rgba(214,43,129,0.3"],
            borderWidth: 1,
        }]
    }
    return <Doughnut data={data} />
}
export function getLastYearMonths() {
    const labels = [];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const currentMonth = new Date().getMonth();
    const remain = 11 - currentMonth;

    for (let i = currentMonth; i >= 0; i--) {
        const element = months[i];
        labels.unshift(element);
    }
    for (let i = 11; i > currentMonth; i--) {
        const element = months[i];
        labels.unshift(element);
        console.log(element)

    }
    return labels;
}