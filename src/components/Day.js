import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext.js';
import ViewAllEventsModal from "./ViewAllEventsModal";

export default function Day({day, rowIdx}){

  const [dayEvents, setDayEvents] = useState([]);
  const [ shortViewEvents, setShortViewEvents ] = useState([]);
  const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent } = useContext(GlobalContext);

  const [viewAllEvents, setViewAllEvents] = useState(false);

  useEffect(()=>{
    const events = filteredEvents.filter((evt)=> day.format("DD-MM-YY")===dayjs(evt.day).format("DD-MM-YY"));
    setDayEvents(events);

  }, [filteredEvents, day]);

  useEffect(()=>{
    if(dayEvents.length>2)
    {
      const evts = [];
      evts.push(dayEvents[0]); evts.push(dayEvents[1]);
      setShortViewEvents(evts);
    }
    else setShortViewEvents(dayEvents);
  }, [dayEvents]);


  function getCurrentDayClass(){
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")? 'bg-blue-600 text-white rounded-full w-7' : '';
  }

  let tempCount = 0;

  return(
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        { rowIdx===0 && <p className="text-sm mt-1"> {day.format('ddd').toUpperCase()} </p>}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>{day.format('DD')}</p>
      </header>
      <div className="flex-1 cursor-pointer"
      onClick={()=>{
        setDaySelected(day);
        setShowEventModal(true);
      }}>
        { shortViewEvents.map((evt,idx)=>(
          <div key={idx} className={`bg-${evt.label}-200 p-1 mr-3 ml-1 text-gray-600 text-sm rounded mb-1 truncate`}
          onClick={()=>{setSelectedEvent(evt)}}>
            {evt.start} {evt.title}
          </div>
        ))}
      </div>
      { dayEvents.length>2 && <div className="p-1 mr-3 ml-1 text-gray-600 text-sm rounded mb-1 truncate cursor-pointer"
      onClick={()=> setViewAllEvents(true)}
      >{dayEvents.length-2} more </div> }
      { viewAllEvents && <ViewAllEventsModal day={day} dayEvents={dayEvents} setViewAllEvents={setViewAllEvents}/>}

    </div>
  );
}

/* { dayEvents.map((evt,idx)=>(
  <div key={idx} className={`bg-${evt.label}-200 p-1 mr-3 ml-1 text-gray-600 text-sm rounded mb-1 truncate`}
  onClick={()=>{setSelectedEvent(evt)}}>
    {evt.title}
  </div>
))} */
