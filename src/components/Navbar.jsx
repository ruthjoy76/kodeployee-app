import Clock from "./Clock";
import Logo from "../assets/logo.png";
import { useState, useEffect } from "react";

function Navbar() {
  const [condition, setCondition] = useState("");

  useEffect(() => {
    let intervalId;

    const getDay = () => {
      if (new Date().getHours() >= 1 && new Date().getHours() < 12) {
        setCondition("Morning");
      } else if (new Date().getHours() >= 12 && new Date().getHours() <= 17) {
        setCondition("Afternoon");
      } else if (new Date().getHours() > 17 && new Date().getHours() <= 24) {
        setCondition("Evening");
      }

      intervalId = setTimeout(getDay, 3600000);
    };

    getDay();

    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
      }
    };
  }, [condition]);

  return (
    <div className="flex items-center justify h-20 bg-purple-100  rounded-lg p-4  text-gray-800  font-semibold text-xl  fixed top-0 left-0 right-0 z-00 shadow-md">
      <img
        src={Logo}
        alt="Logo"
        className="logo object-scale-down h-20  w-40 top-0"
      />
      <h1 className="text-gray-500 hover:text-gray-900">
        Good {condition} Admin!
      </h1>

      <Clock />
    </div>
  );
}

export default Navbar;
