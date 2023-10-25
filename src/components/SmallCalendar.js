import React, {useState, useEffect, useContext} from 'react';
import dayjs from 'dayjs';
import {getMonth} from '../util.js';
import GlobalContext from "../context/GlobalContext";

export default function SmallCalendar(){

  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(()=>{
    setCurrentMonth(getMonth(currentMonthIndex));

  }, [currentMonthIndex])

  const { monthIndex, setMonthIndex, daySelected, setDaySelected } = useContext(GlobalContext);

  useEffect(()=>{
    setCurrentMonthIndex(Math.floor(monthIndex));
    // Math.floor(monthIndex) === dayjs().month() ? setDaySelected(dayjs()) : setDaySelected( dayjs(new Date(dayjs().year(), monthIndex, 1)) );

  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIndex(currentMonthIndex - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIndex(currentMonthIndex + 1);
  }

  function getDayClass(day){
    const format="DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);

    if(nowDay === currDay) return 'bg-blue-500 text-white rounded-full';
    else if(slcDay === currDay) return "bg-blue-100 rounded-full text-blue-600 font-bold";
    else return "hover:bg-gray-100 hover:text-gray-600 hover:font-bold hover:rounded-full";
  }
  function notThisMonthDatesClass(day){
    // console.log(day.format("MM"), " ", );
    return day.format("MM") !== dayjs(new Date(dayjs().year(), currentMonthIndex)).format("MM") ? "text-gray-400" : "";
  }

  return(
      <div className="mt-9">
        <header className="flex justify-between">
          <p className="text-gray-500 font-bold">
            {dayjs(new Date(dayjs().year(), currentMonthIndex)).format("MMMM YYYY")}
          </p>
          <div>
            <button onClick={handlePrevMonth}>
              <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                chevron_left
              </span>
            </button>
            <button onClick={handleNextMonth}>
              <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                chevron_right
              </span>
            </button>
          </div>
        </header>

        <div className="grid grid-rows-6 grid-cols-7">
          {currentMonth[0].map((day, i)=>(
            <span key={i} className="text-sm py-1 text-center">
              {day.format('dd').charAt(0)}
            </span>
          ))}
          {currentMonth.map((row, i)=>(
            <React.Fragment key={i}>
              {row.map((day, idx)=>(
                <button key={idx}
                  onClick = {()=>{
                    setMonthIndex(currentMonthIndex);
                    setDaySelected(day);
                  }}
                  className={`py-1 w-full ${getDayClass(day)}`}>
                  <span className={`text-sm ${notThisMonthDatesClass(day)}`}>{day.format('D')}</span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>

      </div>
  );
}
