import { useState, useEffect } from "react";
import moment from "moment";

function Clock() {
    const [time, setTime] = useState("");
  
    useEffect(() => {
      setInterval(() => {
       
        setTime(moment().format("hh:mm:ss A"));
      }, 1000);
    });
  
    return (
      <div className="absolute top-3 right-10  ">
        <div>
          <h1 className="text-purple-600 text-sm font-bold text-center leading-tight mt-2">{time}</h1>
          <h2 className="text-purple-600 text-sm font-bold text-center leading-tight mt-00">{moment().format("dddd, MMMM D YYYY")}</h2>  
        </div>
   
      </div>
    );
  }

export default Clock