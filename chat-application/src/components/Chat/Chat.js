import React,{useEffect,useState} from 'react';
import './chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
let socket;
const Chat = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('');
    const ENDPOINT = 'localhost:5000';
    useEffect(()=>{
        const {name,room} =queryString.parse(window.location.search);
        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io(ENDPOINT,connectionOptions);
        console.log(socket);
        setName(name);
        setRoom(room);

        socket.emit('join',{name,room},()=>{
        });
        return () =>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT]);
    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages]);

    const sendMessage=(e)=>{
        e.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }
    console.log(message,messages);
    return ( 
        <div className='OuterChat'>
            <div className='chat'>
                {/* <input type='text' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter message here' onKeyPress={(e) => e.key === 'Enter'?sendMessage(e):null} /> */}
                
            </div>
        </div> 
    );
}
 
export default Chat;