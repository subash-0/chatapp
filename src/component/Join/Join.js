import React, { useState } from 'react'
import "./Join.css"
import { Link } from 'react-router-dom'

let user;


const Join = () => {
    const [name, setname] = useState("");
    const sendUser=(e)=>{
        if(!name){
            e.preventDefault();
            alert("Name is mendentory !")
        }
         user = document.getElementById('username').value;
         document.getElementById('username').value = " ";
    }

  return (
    <div className='joinPage'>
    <section className='login' id='login'>
  <div className='head'>
  <h1 className='company'>3S CHAT</h1>
  </div>
  <p className='msg'>Welcome back</p>
  <div className='form'>
    <form>
  <input type="text" onChange={(e)=>setname(e.target.value)} placeholder='Your name ...' className='text' id='username'/><br/> <br/>
  <Link to="/chat" onClick={sendUser} className='btn-login' id='do-login'>Login</Link>
 
    </form>
  </div>
</section>
        </div>
        
    
  )
}

export default Join
export {user}