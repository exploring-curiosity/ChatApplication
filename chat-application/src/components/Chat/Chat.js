import React,{useEffect,useState} from 'react';
import './chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
let socket;
const Chat = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('');
    const ENDPOINT = '192.168.0.100:5000';
    useEffect(()=>{
        const {name,room} =queryString.parse(window.location.search);
        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io(ENDPOINT,connectionOptions);
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
        return() => {
            socket.off();
        }
    },[messages]);

    const sendMessage=(e)=>{
        e.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }
    return ( 
            <div className='chat'>
                <InfoBar room ={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
    );
}
 
export default Chat;