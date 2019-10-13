import React, {useState} from 'react';
import {Line as LineChart} from 'react-chartjs-2';

const options = {
    title: {
        display: true,
        text: 'Currency course',
        fontFamily: 'a_LCDNova',
        fontColor: 'rgb(255, 255, 255, 1)',
        fontSize: 26
    },
    legend: {
        labels: {
            fontFamily: 'a_LCDNova',
            fontColor: 'rgb(255, 255, 255, 1)',
            fontSize: 15
        }
    },
    animation: {
        duration: 3000
    },
    scales: {
        xAxes: [{
            gridLines: {
                color: 'rgb(255, 255, 255, 0.3)'
            },
            ticks: {
                fontColor: 'rgb(255, 255, 255, 1)'
            }
        }],
        yAxes: [{
            gridLines: {
                color: 'rgb(255, 255, 255, 0.3)'
            },
            ticks: {
                fontColor: 'rgb(255, 255, 255, 1)'
            }
        }]
    }
}

const chartData = {
    labels: ['01.10', '02.10', '03.10', '04.10', '05.10', '06.10', '07.10'],
    datasets: [
        {
            label: 'Currency course',
            borderColor: 'rgb(255, 255, 255, 1)',
            backgroundColor: 'rgb(255, 255, 255, 0.1)',
            data: [2.05, 2.01, 2.1, 2.15, 2.11, 2.07, 2.08]
        }
    ]
};

const LineChartExample = () => {
    return (
        <div>
            <LineChart data={chartData}
                       options={options}
                       width="300"
                       height="50"/>
        </div>
    )
};

export default LineChartExample;