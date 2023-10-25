import React, { useState, useEffect, useReducer, useMemo } from 'react';
import GlobalContext from "./GlobalContext.js";
import dayjs from "dayjs";

function savedEventsReducer( state, {type, payload}){
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt)=> evt.id===payload.id ? payload : evt );
    case "delete":
      return state.filter((evt)=> evt.id!==payload.id);
    default:
      throw new Error();
  }
}

function initEvents(){
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props){
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ labels, setLabels ] = useState([]);

  const [ savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

  const filteredEvents = useMemo(()=>{                /*The useMemo Hook can be used to keep expensive, resource intensive functions from needlessly running. nrml fns runs for every render but usememo fns run only when any of its dependencies changes*/
    return savedEvents.filter((evt)=>
      labels.filter((lbl)=> lbl.checked )
      .map( lbl => lbl.label)
      .includes(evt.label)
  );
}, [savedEvents, labels]);

  useEffect(()=>{
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(()=>{
    setLabels((prevLabels) => {
      return [...new Set( savedEvents.map( evt => evt.label ))].map((label) => {
        const currentLabel = prevLabels.find(lblObj => lblObj.label === label)
        return{
          label: label,
          checked: currentLabel ? currentLabel.checked : true,
        }
      })
    })
  }, [savedEvents]);

  function updateLabel(label){
    setLabels( labels.map( (lbl) => label.label===lbl.label?label:lbl ) );
  }

  return(
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex, daySelected, setDaySelected, showEventModal, setShowEventModal,savedEvents, dispatchCalEvent, selectedEvent, setSelectedEvent, labels, setLabels, updateLabel, filteredEvents}}>
      {props.children}
    </GlobalContext.Provider>
  );
}
