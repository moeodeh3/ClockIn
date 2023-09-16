import React from 'react';
import '../styles/AdminLogin.css' 
import { useNavigate } from "react-router-dom";


export default function AdminLogin({setIsLoggedIn}){

    const [password, setPassword]= React.useState(0)
    const inputRef = React.useRef(null);
    const navigate = useNavigate();
    const secretCode = 1234

    React.useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, []);

      function sendToHome(){
        navigate("/");
    }
    
    

    const handleChange = (event) => {
        setPassword(event.target.value);
      };

      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && password == secretCode) {
          setIsLoggedIn(prevIsLoggedIn => !prevIsLoggedIn)
          navigate("/admin");
        }
        else if (e.key === 'Enter'){
          setPassword(0)
          inputRef.current.value = null
        }
      };

    return (
        <div>
            <button className='button-exit' onClick={sendToHome}>Back</button>
            <h2 className='password-title'>Password</h2>
            <div className='password-div'>
                <input 
                    ref={inputRef}
                    className='password-box'
                    type='password' 
                    onChange={handleChange}
                    maxLength="4"
                    onKeyDown={handleKeyPress}
                >      
                </input>
            </div>
        </div>
    )
}
