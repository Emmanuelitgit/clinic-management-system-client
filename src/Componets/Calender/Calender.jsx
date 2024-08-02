// src/Calendar.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { NoticeBoard } from '../../Pages/Admin/Notice/NoticeBoard';


const localizer = momentLocalizer(moment);

const Calender = () => {
  const [events, setEvents] = useState([]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
 }

  useEffect(() => {
    fetch('http://localhost:5000/appointments',  {
      method: 'GET',
      credentials: 'include', // Important for including cookies
  })
      .then(response => response.json())
      .then(data => {
        const formattedEvents = data?.map(appointment => ({
          title: getText(appointment.description),
          start: new Date(appointment.date),
          end: new Date(appointment.date),
        }));
        setEvents(formattedEvents);
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 540, width:'70%' }}
        timeslots={10}
      />
      <NoticeBoard/>
    </div>
  );
};

export default Calender;
