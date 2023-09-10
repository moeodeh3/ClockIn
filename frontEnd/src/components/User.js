import React from "react";
import '../styles/User.css'
import deleteButton from '../assets/delete/xButton.png'


export default function User({name, handleDeleteUser}){


    return (
        <div className="user--div">
            
            <h4 className="user--name">{name}</h4>
            <img 
                className="user--delete"
                src={deleteButton} 
                onClick={() => handleDeleteUser(name)}
            />
            
        </div>
    )
}