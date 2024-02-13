import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  let time;
  useEffect(()=>{
    const currDate = new Date()
    time  = currDate.getHours();
    changeThemeAccordingToTime();
  },[time]);


  const changeThemeAccordingToTime = ()=>{
  let cycle = 0;
  if(time > 4 && time <16){
    let app = document.querySelector(".App");
    app.classList.remove("eveningTime");
    app.classList.add("morning");
  }
  else{
    let app =document.querySelector(".App");
    app.classList.remove("morning");
    app.classList.add("eveningTime");
    cycle += 1;
  }
}
  return (
    <div className="App" style={{overflowY:"none"}}>
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
