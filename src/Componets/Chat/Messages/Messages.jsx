import React from 'react';
import "./Messages.css";
import { useState, useEffect, useRef } from "react";
import { format, parseISO, isValid } from 'date-fns';

const Messages = ({ messages }) => {
  
  const userId = localStorage.getItem("userId");
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (timeString) => {
    try {
      const date = new Date(timeString);
      if (isValid(date)) {
        return format(date, 'hh:mm a');
      } else {
        return 'Invalid date';
      }
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className='messages-container'>
      {messages.map((msg, index) => {
        const formattedTime = formatTime(msg.created_at);
        return (
          <div 
            key={index} 
            className={`message ${msg.sender === userId ? 'message-sender' : 'message-receiver'}`}
          >
            <p>
              {msg.message} 
              <p className='time-value'>{formattedTime}</p>
            </p>
           
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;