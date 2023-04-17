import React from "react";
import { useSelector } from "react-redux";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Alerterrors = () => {
  const errors = useSelector((state) => state.errorreducer);
  
  const showErrorNotification = (message) => {
    NotificationManager.error(message, 'Error', 3000);
  };

  return (
    <div>
      {errors.map((el) => {
        showErrorNotification(el.msg);
        return null;
      })}
      <NotificationContainer/>
    </div>
  );
};

export default Alerterrors;