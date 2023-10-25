import React, { useContext } from 'react';
import plus from '../assets/plus.png';
import GlobalContext from "../context/GlobalContext.js";

export default function CreateEventButton(){

  const { setShowEventModal } = useContext(GlobalContext);
  return(
    <button onClick={()=> setShowEventModal(true) }
    className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl">
      <img src={plus} alt="create-event-button" className="w-7 h-7"/>
      <span className="pr-7 pl-3">Create</span>
    </button>
  );
}
