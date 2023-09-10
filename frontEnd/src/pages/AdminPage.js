import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css';
import User from '../components/User';

function AdminPage({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);


  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
        getUsers()
    }
  }, [isLoggedIn]);

  function sendToHome() {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
    navigate('/');
  }

  function getUsers(){
    fetch(`http://127.0.0.1:8000/admin?isAdmin=${isLoggedIn}`)
        .then((res) => res.json())
        .then((data) => {
          // Use setAllUsers to update the state with the fetched data
          setAllUsers(
            data.map((user) => (
              <User
                key={user.id} 
                name={user.name}
                handleDeleteUser={handleDeleteUser}
              />
            ))
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
  }

  function handleDeleteUser(name) {
    fetch(`http://127.0.0.1:8000/delete?name=${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        }
    })
    getUsers()
  }

  function addUser(){
    navigate('/adduser');
  }

  return (
    <div>
      <button className='button-addUser' onClick={addUser}>Add User</button>
      <button className='button-exit' onClick={sendToHome}>Exit</button>
      <div className="adminpage--div">{allUsers}</div>
    </div>
  );
}

export default AdminPage;
