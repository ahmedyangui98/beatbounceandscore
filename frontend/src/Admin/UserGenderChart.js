import React, { useState, useEffect } from 'react';

import axios from 'axios';
import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const UserGenderChart = () => {
  
    const [chartData, setChartData] = useState([]);
    const fetchChartData = async () => {
      const response = await axios.get('http://localhost:4000/api/users/countByGender');
      
      console.log(response)
      setChartData(response.data);
    };
  useEffect(() => {
    
    fetchChartData();
  }, []);
  console.log(chartData);
  
  
  const options = {
    title: {
      text: 'User GenderChart',
    },
    data: [
      {
        type: 'column',
        dataPoints: chartData
          ? [
              
              { label: 'male', y: chartData?.find((c) => c._id === 'male')?.count },
              { label: 'female', y: chartData?.find((c) => c._id === 'female')?.count },
          
            ]
          : [],
      },
    ],
  };
  console.log('chartData:', chartData);
  console.log('Coach count:', chartData?.count?.find((c) => c._id === 'coach')?.count);
  console.log('Parent count:', chartData?.count?.find((c) => c._id === 'parent')?.count);
  console.log('User count:', chartData?.count?.find((c) => c._id === 'user')?.count);
  console.log('Admin count:', chartData?.count?.find((c) => c._id === 'admin')?.count);
  return (
    <div>
      {chartData ? (
        <CanvasJSChart options={options} />
      ) : (
        <p>Loading chart data....</p>
      )}
    </div>
  );
 

};
  export default UserGenderChart;