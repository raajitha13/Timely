import React, { useState, useContext, useEffect } from 'react';
// import ReactECharts from 'echarts-for-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import GlobalContext from '../context/GlobalContext.js';
import dayjs from 'dayjs';

export default function Charts(){

  const {savedEvents} = useContext(GlobalContext);

  const data = [
        { name: 'Sun',indigo: 0, gray: 0, green: 0, blue: 0, red: 0, purple: 0},
        { name: 'Mon', indigo: 0, gray: 0, green: 0, blue: 0, red: 0, purple: 0},
        { name: 'Tue', indigo: 0, gray: 0, green: 0, blue: 0, red: 0, purple: 0},
        { name: 'Wed', indigo: 0, gray: 0, green: 0, blue: 0, red: 0, purple: 0},
        { name: 'Thu', indigo: 0, gray: 0, green: 0, blue: 0, red: 0, purple: 0},
        { name: 'Fri', indigo: 0, gray: 0, green: 0, blue: 0, red: 0, purple: 0},
        { name: 'Sat', indigo: 0, gray: 0, green: 0, blue: 0, red: 0, purple: 0},
    ];

  // const weekOptions = {
  //     xAxis: {
  //       type: 'category',
  //       data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  //     },
  //     yAxis: {
  //       type: 'value',
  //       min: 0,
  //       max:3000
  //     },
  //     series: [
  //       {
  //         data: [0, 0, 0, 0, 0, 0, 0],
  //         type: 'bar'
  //       }
  //     ]
  //   };

    const [options, setOptions] = useState(data);

    const year = dayjs().year();
    const month = dayjs().month();
    const currentDay = dayjs().day();

    const [currentWeek, setCurrentWeek ] = useState(0);
    const [startOfWeek, setStartOfWeek] = useState(new Date(year, month, dayjs().format('DD')-currentDay));
    const [endOfWeek, setEndOfWeek] = useState(new Date(year, month, dayjs().format('DD')-currentDay+6));

    useEffect(()=>{
      for(let i=0;i<7;i++){
        data[i].indigo = 0;
        data[i].gray = 0;
        data[i].green = 0;
        data[i].blue = 0;
        data[i].red = 0;
        data[i].purple = 0;
      }
      // console.log(weekOptions.series[0]);
      savedEvents.map((evt)=>{
        // console.log(dayjs(evt.day).format('ddd'));

        let day = dayjs(evt.day).format('ddd');
        let date = new Date(evt.day);
        let evtTime = evt.timeSpent;

        let sow = new Date(year, month, dayjs().format('DD')-currentDay+(currentWeek*7));
        let eow = new Date(year, month, dayjs().format('DD')-currentDay+6+(currentWeek*7));
        setStartOfWeek(sow);
        setEndOfWeek(eow);

        console.log(startOfWeek, " ", endOfWeek, " ", date, " ", (date>=startOfWeek && date<=endOfWeek), " ", day);
        // console.log(dayjs().format('DD')-currentDay+6);

        if( date>=sow && date<=eow )
        {
          switch (day) {
              case "Sun": data[0][evt.label]+=evtTime;
                          break;
              case "Mon": data[1][evt.label]+=evtTime;
                          break;
              case "Tue": data[2][evt.label]+=evtTime;
                          break;
              case "Wed": data[3][evt.label]+=evtTime;
                          break;
              case "Thu": data[4][evt.label]+=evtTime;
                          break;
              case "Fri": data[5][evt.label]+=evtTime;
                          break;
              case "Sat": data[6][evt.label]+=evtTime;
                          break;
              default:
            }
       }
      })
      setOptions(data);
    }, [savedEvents, currentWeek]);

    function handlePrevWeek(){
      setCurrentWeek(currentWeek-1);
    }

    function handleNextWeek(){
      setCurrentWeek(currentWeek+1);
    }

    function handleReset(){
      setCurrentWeek(0);
    }

    var tooltip;
    const CustomTooltip = ({ active, payload }) => {
      if (!active || !tooltip)    return null
      for (const bar of payload)
          if (bar.dataKey === tooltip)
              return <div>{ bar.name }<br/>{ bar.value.toFixed(2) }</div>
      return null
    }

  return(
    <div className="ml-20 mt-5 px-4 py-5 ">
        <header className="ml-20 mt-5 px-4 py-5 flex items-center">

        <button onClick={handlePrevWeek}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 pt-2 mx-2">
              chevron_left
            </span>
          </button>

            <span className="text-gray-600 text-2xl cursor-pointer" onClick={handleReset}>Weekly Insights</span>

          <button onClick={handleNextWeek}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 pt-2 mx-2">
              chevron_right
            </span>
          </button>
          {/*<button className="border rounded py-2 px-4 ml-5 mr-5" >Today</button>*/}

          <div>
            <span>{startOfWeek.toLocaleDateString('pt-PT')} - {endOfWeek.toLocaleDateString('pt-PT')}</span>
          </div>

      </header>

      <BarChart width={1000} height={500} data={options} >
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name" />
           <YAxis />
           <Tooltip content={<CustomTooltip />}/>
           <Bar dataKey="indigo" stackId="a" fill="#A3BFFA" name="indigo" onMouseOver={ () => tooltip="indigo"}/>
           <Bar dataKey="gray" stackId="a" fill="#CBD5E0" name="gray" onMouseOver={ () => tooltip="gray"}/>
           <Bar dataKey="green" stackId="a" fill="#C6F6D5" name="green" onMouseOver={ () => tooltip="green"}/>
           <Bar dataKey="blue" stackId="a" fill="#90CDF4" name="blue" onMouseOver={ () => tooltip="blue"}/>
           <Bar dataKey="red" stackId="a" fill="#FC8181" name="red" onMouseOver={ () => tooltip="red"}/>
           <Bar dataKey="purple" stackId="a" fill="#D6BCFA" name="purple" onMouseOver={ () => tooltip="purple"}/>
       </BarChart>
    </div>
  );
}
