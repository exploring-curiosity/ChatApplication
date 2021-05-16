import React,{useEffect,useState} from 'react';
import './chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
let socket;
const Chat = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
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
    },[ENDPOINT])
    return ( 
        <div>
            <h1>Chat</h1>
        </div> 
    );
}
 
export default Chat;