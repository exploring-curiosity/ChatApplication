import React from 'react';
import './message.css';
const Message = ({message:{user,text},name}) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if(user === trimmedName)
    {
        isSentByCurrentUser = true;
    }
    return (  
        isSentByCurrentUser
        ?(
            <div className='message justifyEnd'>
                <p className='senttext pr'>{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className='msgtext'>{text}</p>
                </div>
            </div>
        )
        :(
            <div className='message'>
                <div className="messageBox">
                    <p className='msgtext'>{text}</p>
                </div>
                <p className='senttext'>{user}</p>
            </div>
        )
    );
}
 
export default Message;