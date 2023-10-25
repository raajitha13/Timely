import React, {useState, useContext, useEffect } from 'react';
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import TimeOptions from './TimeOptions.js'

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal(){

  const { setShowEventModal, daySelected, setDaySelected, dispatchCalEvent, selectedEvent, setSelectedEvent } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent? selectedEvent.title : "");
  const [description, setDescription] = useState(selectedEvent? selectedEvent.description :"");
  const [selectedLabel, setSelectedLabel] = useState(selectedEvent? labelsClasses.find((lbl) => lbl === selectedEvent.label): labelsClasses[0]);

  const [startTime, setStartTime] = useState(selectedEvent? selectedEvent.start : "07:00");
  const [endTime, setEndTime] = useState(selectedEvent? selectedEvent.end : "08:00");

  const [ totalTime, setTotalTime] = useState(selectedEvent? selectedEvent.timeSpent : 0);
  useEffect(()=>{
    const startTimeHrs = parseInt(startTime.split(":")[0]);
    const startTimeMins = parseInt(startTime.split(":")[1]);
    const endTimeHrs = parseInt(endTime.split(":")[0]);
    const endTimeMins = parseInt(endTime.split(":")[1]);
    setTotalTime( (endTimeHrs - startTimeHrs)*60 + (endTimeMins-startTimeMins) );
  }, [startTime, endTime]);

  function handleSubmit(e){
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected,
      start: startTime,
      end: endTime,
      timeSpent: totalTime,
      id: selectedEvent? selectedEvent.id : Date.now(),
    };
    if(selectedEvent){
      dispatchCalEvent({type: "update", payload: calendarEvent});
    }
    else{
      dispatchCalEvent({type: "push", payload: calendarEvent});
    }
    setShowEventModal(false);
  }

  return(
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-2/5">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            { selectedEvent &&
              <span onClick={()=>{
                 dispatchCalEvent({type: "delete", payload: selectedEvent});
                 setSelectedEvent(null);
                 setShowEventModal(false);
                 setDaySelected(dayjs());
               }}
              className="material-icons-outlined text-gray-400 cursor-pointer">
                delete
              </span>
            }
            <button onClick={()=>setShowEventModal(false)} >
              <span className="material-icons-outlined text-gray-400" onClick={()=>{setSelectedEvent(null); setDaySelected(dayjs()); }}>
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input type="text" name="title" placeholder="Add a title" value={title} required onChange={(e)=>setTitle(e.target.value)}
            className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:ouline-none focus:ring-0 focus:border-blue-500"
            />
            <span className="material-icons-outlined text-gray-400 ">
              schedule
            </span>
            <p className="">{daySelected.format("dddd, MMMM DD")}</p>

            <span className="material-icons-outlined text-gray-400">
              time
            </span>
            <div class="flex">
              <TimeOptions option="start" startTime={startTime} handleStartTime={setStartTime} endTime={endTime} handleEndTime={setEndTime}/>
              <span className="ml-8 mr-10"> to </span>
              <TimeOptions option="end" startTime={startTime} handleStartTime={setStartTime} endTime={endTime} handleEndTime={setEndTime}/>
            </div>

            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input type="text" name="description" placeholder="Add a description" value={description} required onChange={(e)=>setDescription(e.target.value)}
            className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:ouline-none focus:ring-0 focus:border-blue-500"
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i)=>(
                <span key={i} className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                onClick={()=>setSelectedLabel(lblClass)}
                >
                  { selectedLabel===lblClass && <span className="material-icons-outlined text-white text-sm">check</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5" >
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          onClick={handleSubmit}>
            save
          </button>
        </footer>
      </form>
    </div>
  );
}
