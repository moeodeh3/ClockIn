import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/HomeScreen.css'
import background from '../assets/background/background.png' 

export default function HomeScreen() {


  const navigate = useNavigate();




  function formatMinute(minute) {
    return minute < 10 ? "0" + minute : minute;
  }

  function formatHour(hour) {
    if (hour === 0) {
      return 12;
    } else if (hour <= 12) {
      return hour;
    } else {
      return hour - 12;
    }
  }

  function sendToLogin() {
    navigate("/login");
  }




  useEffect(() => {
    const intervalId = setInterval(() => {
      // Get the current time
      const currentTime = new Date();
      const hour = currentTime.getHours();
      const minute = currentTime.getMinutes();
      const meridiem = hour < 12 ? "AM" : "PM";

      // Set the time using the calculated values
      setTime({
        hour,
        minute,
        meridiem,
      });
    }, 1000); // Update every second

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);




  const [time, setTime] = React.useState({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    meridiem: new Date().getHours() < 12 ? "AM" : "PM",
  });





  return (
    <div className="main">
      <div className="background--div">
        <img src={background} className="background" alt="Background" />
      </div>
      <h1 className="time">
        {formatHour(time.hour)}:{formatMinute(time.minute)}
      </h1>
      <h4 className="meridiem">{time.meridiem}</h4>
      <button onClick={sendToLogin}>Admin</button>
    </div>
  );
}
