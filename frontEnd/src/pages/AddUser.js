import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/AddUser.css'
import fingerPrint from '../assets/fingerprint/fingerPrint.gif'

export default function AddUser({isLoggedIn}){

    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false)
    const [firstError, setFirstError ] = useState("")
    const [lastError, setLastError ] = useState("")
    const [fingerError, setFingerError ] = useState("")




    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/login');
      } 
      else{

        fetch(`http://127.0.0.1:8000/addfinger`)
        .then((res) => res.json())
        .then((data) => {
          if (data){
            setIsChecked(true)
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      }
    }, [isLoggedIn]);

    function sendToAdmin() {
      navigate('/admin');
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        setFirstError("")
        setLastError("")
        setFingerError("")
        
        
        const formData = new FormData(event.target);
        const firstName = formData.get('first');
        const lastName = formData.get('last');
        const url = "URL"

        if (firstName === ""){
          setFirstError("Please enter a valid first name")
        }
        else if (lastName === ""){
          setLastError("Please enter a valid last name")
        }
        else if (!isChecked){
          setFingerError("Please add your fingerprint")
        }
        else {

          fetch(`http://127.0.0.1:8000/add?firstName=${firstName}&lastName=${lastName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          
          navigate('/admin');
        }
        
        
        
    };
      
      
    return (
        <div>

          <form className='form' onSubmit={handleSubmit}>
          <button className='button-exit' onClick={sendToAdmin} type='button'>Exit</button>
            <label>
              <h5 className='inputBox--label'>First Name</h5>
              <input className='text-box' type='text' name='first' />
              <h5 className='inputBox--label'>Last Name</h5>
              <input className='text-box' type='text' name='last' />
              <img className="fingerprintGIF" src={fingerPrint}/>

              <div className='form--div'>
                <input type="checkbox" name="isFingerPrintAdded" checked={isChecked} readOnly></input>
                <p className='description'>Fingerprint added</p>
                
              </div>
              <input className='submit--button' type="submit" value="Done" />
            </label>
          </form>

          <p className='error-box-first'>{firstError}</p>
          <p className='error-box-last'>{lastError}</p>
          <p className='error-box-finger'>{fingerError}</p>
        </div>
        

        
    )
}