import React, { useEffect, useState } from 'react'
import socketIo from 'socket.io-client'
import "./Chat.css";
import sendLogo from "../../image/send.png"
import { user } from '../Join/Join';
import Message from '../Message/Message';
import ReactScrollToBottom  from 'react-scroll-to-bottom';
import closeBtn from '../../image/close.png'

let socket;
const ENDPOINT = "https://threeschatbackend.onrender.com"
const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const sedMessage = ()=>{
    const message = document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value="";
  }

    useEffect(() => {
         socket = socketIo(ENDPOINT,{transports:['websocket']});
        socket.on('connect',()=>{
          setId(socket.id);

        })
        socket.emit("joined",{user})
        socket.on('welcome',(data)=>{
          setMessages((m)=>[...m,data]);
        })
        socket.on("userjoined",(data)=>{
          setMessages((m)=>[...m,data]);
          console.log(data)
        })
       socket.on('leave',(data)=>{
        setMessages((m)=>[...m,data]);
       })
      return () => {
        socket.emit('disconnect');
        socket.off();
      
      }
    },[])
    
    useEffect(() => {
      socket.on('sentMessage',(data)=>{
        setMessages((m)=>[...m,data]);
      
      })
    
      return () => {
        socket.off();
      }
    }, [messages])
    

  return (
    <div className='chatPage'>
       <div className='chatContainer'>
            <div className='header'>
              <h2>3S CHAT</h2>
              <a href='/'><img src={closeBtn} alt='close Btn' height={30}  width={30}/></a> 
            </div>
                <ReactScrollToBottom className='chatBox'>
                 {
                  messages.map((msg,i)=>{
                   return <Message key={i} user={msg.id===id?'':msg.user} message={msg.message}  classs={msg.id===id?'right':'left'}/>
                  })
                 }
                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input type='text' placeholder='Type Your Message ...' id='chatInput' />
                    <button className='sendBtn' onClick={sedMessage} ><img src={sendLogo}  alt='sendLogo' /> </button>
                </div>

            
       </div>
    </div>
  )
}

export default Chat