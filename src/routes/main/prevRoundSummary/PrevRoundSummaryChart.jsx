import React from 'react';
import Chart from 'react-apexcharts';

import './PrevRoundSummaryChart.scss';

const PrevRoundSummaryChart = () => {
  const options = {
    noData: {
      text: 'Not enough data to display yet',
      style: {
        color: '#1f4190',
        fontSize: '1.5rem',
        fontFamily: 'Nexa Bold'
      }
    },
    dataLabels: {
      enabled: false
    },

    tooltip: {
      x: {
        show: true
      },
      y: {
        title: {
          formatter: () => 'SGD'
        }
      }
    },

    grid: {
      show: true,
      borderColor: '#DDDFE7',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },

    markers: {
      size: 0,
      style: 'hollow'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Nexa Bold'
        }
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    colors: ['#1f4190'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.7,
        stops: [0, 100]
      }
    }
  };
  const series = [
    {
      name: 'Average price',
      data: [
        [1486684800000, 6.6],
        [1486771200000, 6.4],
        [1486857600000, 6.33],
        [1486944000000, 6.88],
        [1487030400000, 6.53],
        [1487116800000, 6.22]
      ]
    }
  ];

  return <Chart type="area" options={options} series={series} height={250} />;
};

export default PrevRoundSummaryChart;
