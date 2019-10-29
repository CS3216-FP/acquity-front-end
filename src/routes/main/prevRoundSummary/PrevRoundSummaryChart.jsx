import React from 'react';
import Chart from 'react-apexcharts';

const PrevRoundSummaryChart = () => {
  const options = {
    dataLabels: {
      enabled: false
    },

    markers: {
      size: 0,
      style: 'hollow'
    },
    xaxis: {
      type: 'datetime'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    }
  };
  const series = [
    {
      name: 'Series 1',
      data: [
        [1486684800000, 34],
        [1486771200000, 43],
        [1486857600000, 31],
        [1486944000000, 43],
        [1487030400000, 33],
        [1487116800000, 52]
      ]
    }
  ];

  return <Chart type="area" options={options} series={series} />;
};

export default PrevRoundSummaryChart;
