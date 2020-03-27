import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 2',
      data: [65, 10, 80, 81, 56, 85, 40],
      borderColor: 'black',
      fill: false,
    },
    {
      type: 'bar',
      label: 'Dataset 1',
      backgroundColor: 'green',
      data: [65, 0, 80, 81, 56, 85, 40],
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'cyan',
      data: [65, 16, 80, 81, 56, 85, 40],
    },
    {
      type: 'bar',
      label: 'Dataset 4',
      backgroundColor: 'pink',
      data: [65, -78, 80, 81, 56, 85, 40],
    },
  ],
}

const options = {
  scales: {
    xAxes: [{ stacked: true }],
    yAxes: [{ stacked: true }],
  },
}

class GraficoCarriers extends Component {
  render() {
    return <Bar options={options} maintainAspectRatio height={80} data={data} />
  }
}

export default GraficoCarriers
