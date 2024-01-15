import React from 'react'
import "./Message.css"
const Message = ({user,message,classs}) => {
    if(user==="Admin"){
        return (
            <div className={`messageBox`}>
               <p>{`${user}: ${message}`}</p> 
                </div>
          )

    
    }else  if(user){
        return (
            <div className={`${classs} messageBox`}>
                {`${user}: ${message}`}
                </div>
          )
        }else{
        return (
            <div className={`${classs} messageBox`}>
                {`You : ${message}`}
                </div>
          )

    }
  
}

export default Message