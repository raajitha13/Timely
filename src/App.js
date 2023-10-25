import React from 'react';
import './App.css';
// import { getMonth } from './util.js';
// import CalendarHeader from './components/CalendarHeader';
// import Sidebar from './components/Sidebar';
// import Month from './components/Month';
// import GlobalContext from "./context/GlobalContext.js";
// import EventModal from "./components/EventModal.js";
import Home from './components/Home.js';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import Charts from './components/Charts.js';

function App() {

  // const [currentMonth, setCurrentMonth] = useState(getMonth());
  // const { monthIndex, showEventModal } = useContext(GlobalContext);
  //
  // useEffect(() => {
  //   setCurrentMonth(getMonth(monthIndex));
  // }, [monthIndex]);

  return (
    <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/Charts" element={<Charts />} />
      </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
