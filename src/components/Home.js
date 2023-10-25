import React, {useState, useContext, useEffect } from 'react';
import { getMonth } from '../util.js';
import CalendarHeader from './CalendarHeader';
import Sidebar from './Sidebar';
import Month from './Month';
import GlobalContext from "../context/GlobalContext.js";
import EventModal from "./EventModal.js";


function Home() {

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>

      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">     {/*try flex-row if any doubts*/}
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth}/>
        </div>
      </div>

    </React.Fragment>
  );
}

export default Home;
