import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getusers } from "../redux/Action/authAction";

const UserBarChart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getusers());
  }, []);

  const userData = useSelector((state) => state.Authreducer.users);

  const filteredDataByTimeFrame = (timeFrame) => {
    const currentDate = new Date();
    let filteredData = [];

    switch (timeFrame) {
      case "day":
        filteredData = userData.filter(
          (user) =>
            new Date(user.lastLogin) > new Date(currentDate.setDate(currentDate.getDate() - 1))
        );
        break;
      case "week":
        filteredData = userData.filter(
          (user) =>
            new Date(user.lastLogin) > new Date(currentDate.setDate(currentDate.getDate() - 7))
        );
        break;
      case "month":
        filteredData = userData.filter(
          (user) =>
            new Date(user.lastLogin) > new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        );
        break;
      case "year":
        filteredData = userData.filter(
          (user) =>
            new Date(user.lastLogin) > new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
        );
        break;
      default:
        filteredData = userData;
        break;
    }

    return filteredData;
  };

  const data = {
    labels: ["Last Day", "Last Week", "Last Month", "Last Year"],
    datasets: [
      {
        label: "Number of Users",
        data: [
          filteredDataByTimeFrame("day").length,
          filteredDataByTimeFrame("week").length,
          filteredDataByTimeFrame("month").length,
          filteredDataByTimeFrame("year").length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Bar data={data} options={{}} />
      </div>
  );
};

export default UserBarChart;
