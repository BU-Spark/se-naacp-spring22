import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
    labels: [
        'Male',
        'Female'
    ],
    datasets: [{
        data: [51, 49],
        backgroundColor: [
            '#FF6384',
            '#36A2EB'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'
        ]
    }]
};

const options = {
    responsive: false,
    maintainAspectRatio: false
};

export default function PieChartGender() {
    return (
        <div h-3 w-3 inline>
            <h2>Statistics by Gender</h2>
            <Pie
                data={data}
                width={250}
                height={250}
                options={options}
            />
        </div>
    );
}
