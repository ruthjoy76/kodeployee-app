import React from "react";
import leaveService from "../services/leaveService";
import { FaTrash, FaEdit } from "react-icons/fa";

function LeaveApplicationList({
 leaveApplications,
  setLeaveApplications,
  setLoading,
}) 
useEffect(() => {
 leaveService
   .getLeaveApplications()
   .then((response) => {
    setLeaveApplications(response);
   })
   .catch((error) => console.log(error));
}, []);

const deleteLeaveApplication = (id) => {
 setLoading(true);

 leaveService
   .deleteLeaveApplication(id)
   .then((_response) => {
    setLeaveApplications(leaveApplications.filter((leaveApplication) => leaveApplication.id !== id));
   })
   .catch((error) => console.log(error))
   .finally(() => setLoading(false));
};


  return (
  <ul className="w-full h-full">
  {leaveApplications.map((leaveApplication) => (
    <li
      key={leaveApplication.id}
      className="flex items-center justify-between bg-white rounded-lg shadow-md w-96 p-4 mb-4"
    >
      {leaveApplication.Leavetype}
      {leaveApplication.FromDate}
      {leaveApplication.ToDate}
      {leaveApplication.Reasonforleave}
      {leaveApplication.Status}

      <button className="text-blue-500 hover:text-blue-700" onClick="">
        <FaEdit size="1rem" />
      </button>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => deleteLeaveApplication(leaveApplication.id)}
      >
        <FaTrash size="1rem" />
      </button>
    </li>
  ))}
</ul>
);


export default LeaveApplicationList;
