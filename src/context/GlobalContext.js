import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: ()=>{},
  savedEvents: [],
  dispatchCalEvent: ({type, payload})=>{},
  selectedEvent: null,
  setSelectedEvent: ()=>{},
  labels: [],
  setLabels: ()=>{},
  updateLabel: ()=>{},
  filteredEvents: [],
});

export default GlobalContext;



// The argument passed to createContext will only be the default value if the component that uses useContext has no Provider above it further up the tree.
//You could instead create a Provider that supplies the style and visibility as well as functions to toggle them.
// const { createContext, useContext, useState } = React;
//
// const ThemeContext = createContext(null);
//
// function Content() {
//   const { style, visible, toggleStyle, toggleVisible } = useContext(
//     ThemeContext
//   );
//
//   return (
//     <div>
//       <p>
//         The theme is <em>{style}</em> and state of visibility is
//         <em> {visible.toString()}</em>
//       </p>
//       <button onClick={toggleStyle}>Change Theme</button>
//       <button onClick={toggleVisible}>Change Visibility</button>
//     </div>
//   );
// }
//
// function App() {
//   const [style, setStyle] = useState("light");
//   const [visible, setVisible] = useState(true);
//
//   function toggleStyle() {
//     setStyle(style => (style === "light" ? "dark" : "light"));
//   }
//   function toggleVisible() {
//     setVisible(visible => !visible);
//   }
//
//   return (
//     <ThemeContext.Provider
//       value={{ style, visible, toggleStyle, toggleVisible }}
//     >
//       <Content />
//     </ThemeContext.Provider>
//   );
// }
//
// ReactDOM.render(<App />, document.getElementById("root"));
