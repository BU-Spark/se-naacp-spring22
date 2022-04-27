import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
    labels: [
        'Black',
        'White',
        'American Indian',
        'Asian'
    ],
    datasets: [{
        data: [8, 54, 1, 32],
        backgroundColor: [
            '#808080',
            '#33FFFF',
            '#33FF33',
            '#FF9933'
        ],
        hoverBackgroundColor: [
            '#808080',
            '#33FFFF',
            '#33FF33',
            '#FF9933'
        ]
    }]
};

const options = {
    responsive: false,
    maintainAspectRatio: false
};

export default function PieChartRace() {
    return (
        <div h-3 w-3 inline>
            <h2>Statistics by Race</h2>
            <Pie
                data={data}
                width={250}
                height={250}
                options={options}
            />
        </div>
    );
}
