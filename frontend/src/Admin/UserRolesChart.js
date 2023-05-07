import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const UserRolesChart = () => {
  
    const [chartData, setChartData] = useState([]);
    const fetchChartData = async () => {
      const response = await axios.get('https://beat-bounce-and-score-server.onrender.com/api/users/countByRole');
      
      console.log(response)
      setChartData(response.data);
    };
  useEffect(() => {
    
    fetchChartData();
  }, []);
  console.log(chartData);
  
  
  const options = {
    title: {
      text: 'User Number',
    },
    data: [
      {
        type: 'column',
        dataPoints: chartData
          ? [
              { label: 'user', y: chartData?.find((c) => c._id === 'user')?.count },
              { label: 'admin', y: chartData?.find((c) => c._id === 'admin')?.count },
              { label: 'parent', y: chartData?.find((c) => c._id === 'parent')?.count },
              { label: 'coach', y: chartData?.find((c) => c._id === 'coach')?.count },
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
  export default UserRolesChart;