import Logo from "../assets/logo.png";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

function Sidebar({user, setUser}) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) navigate("/dashboard");
  }, [user, navigate]);
  
  const handleLogout = () =>{
    window.localStorage.removeItem("loggedEmployeeRecordsUser");
    setUser(null)
  }
  
  return (
    <div className="bg-[#FAF7F7] text-black h-screen w-40 fixed top-0 left-0  z-50 shadow-md' flex flex-col">
      <img
        src={Logo}
        alt="Logo"
        className="logo object-scale-down h-20  w-40 top-0"
      />
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li className="p-2 text-center hover:bg-purple-700">
            <Link to="/dashboard" className="text-black-500">
              Dashboard
            </Link>
          </li>
          <li className="p-2 text-center hover:bg-purple-700">
            <Link to="/employee" className="text-black-500">
              Employee
            </Link>
          </li>
          <li className="p-2 text-center hover:bg-purple-700">
            <Link to="/leave" className="text-black-500">
              Leave
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="p-6 text-black">
        <div className="flex items-center pb-5 text-purple-700">
          <MdLogout className="text-2xl" />
          <button onClick={handleLogout} className="ml-2 ">Logout</button>
        </div>
        <p className="text-xs">© 2023 Kodeployee</p>
      </footer>
    </div>
  );
}

export default Sidebar;
