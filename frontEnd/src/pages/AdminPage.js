import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css'
import User from '../components/User'


function AdminPage({isLoggedIn, setIsLoggedIn}) {
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn){
      navigate("/login");
    }
  }, []);

  function sendToHome(){
    setIsLoggedIn(prevIsLoggedIn => !prevIsLoggedIn)
    navigate("/");
}

  function handleDeleteUser(){
    console.log("FILL THIS IS")
  }

  
  return (
    <div>
      <button onClick={sendToHome}>Exit</button>
      <div className='adminpage--div'>
        <User handleDeleteUser= {handleDeleteUser}/>
        <User handleDeleteUser= {handleDeleteUser}/>
        <User handleDeleteUser= {handleDeleteUser}/>
        <User handleDeleteUser= {handleDeleteUser}/>
        <User handleDeleteUser= {handleDeleteUser}/>
      </div>
    </div>
  );
}

export default AdminPage;
