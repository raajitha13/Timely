import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function ViewAllEventsModal({day, dayEvents, setViewAllEvents}){

  const { setDaySelected, setShowEventModal, setSelectedEvent } = useContext(GlobalContext);

  return(
    <div className=" w-1/3 fixed">
      <form className="bg-white rounded-lg shadow-2xl w-2/5">
        <header className=" px-4 py-2 flex justify-between items-center">
          <span className="items-center text-lg">{day.format('ddd')} {day.format('DD')}
          </span>
          <button onClick={()=>{setViewAllEvents(false)}} >
            <span className="material-icons-outlined text-gray-400" >
              close
            </span>
          </button>
        </header>
        <div className="flex-1 px-2 py-3">
          { dayEvents.map((evt,idx)=>(
            <div key={idx} className={`bg-${evt.label}-200 p-1 mr-3 ml-1 text-gray-600 text-sm rounded mb-1 truncate cursor-pointer`}
            onClick={()=>{
              setViewAllEvents(false);
              setSelectedEvent(evt);
              setDaySelected(day);
              setShowEventModal(true);
            }}>
              {evt.start} {evt.title}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
