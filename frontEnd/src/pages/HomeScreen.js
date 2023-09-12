import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/HomeScreen.css'
import background from '../assets/background/background.png'

export default function HomeScreen() {


  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const socketRef = useRef(null)
  const websocketUrl = "ws://localhost:8000/ws" // Update with your backend WebSocket URL (In this case its localhost)

  useEffect(() => {
    socketRef.current = new WebSocket(websocketUrl)


    socketRef.current.onmessage = (event) => {
      setWelcomeMessage("Welcome " + event.data)
    }

  }, [])





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

    
      // First interval (updates time every second)
      const timeIntervalId = setInterval(() => {
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

    const welcomeMessageInterval = setInterval(() => {
      setWelcomeMessage("");
    }, 5000); 

    // Clean up both intervals
    return () => {
      clearInterval(timeIntervalId);
      clearInterval(welcomeMessageInterval);
    };

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
      <h5 className='welcome-message'>{welcomeMessage}</h5>
      <button className='button-exit' onClick={sendToLogin}>Admin</button>
    </div>
  );
}
