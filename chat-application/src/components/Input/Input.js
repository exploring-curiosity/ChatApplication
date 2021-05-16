import React from 'react';
import './input.css';
const Input = ({message,setMessage,sendMessage}) => {
    return (  
        <form className='form'>
            <input className='input' type='text' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter message here' onKeyPress={(e) => e.key === 'Enter'?sendMessage(e):null} />
            <button className='sendbutton' onClick={(e)=>sendMessage(e)}>SEND</button>
        </form>
    );
}
 
export default Input;