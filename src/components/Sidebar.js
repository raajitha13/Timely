import React from 'react';
import CreateEventButton from './CreateEventButton.js';
import SmallCalendar from './SmallCalendar.js';
import Labels from './Labels.js';

export default function Sidebar(){
  return(
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
      
    </aside>
  );
}
