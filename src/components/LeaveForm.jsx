import React from "react";
import { useState, useEffect } from "react";
import leaveService from "../services/leaveService";

function LeaveForm({
  leaveApplications,
  setLeaveApplications,
  setLoading,
}) 
  const [newLeavetype, setNewLeavetype] = useState("");
  const [newFromDate, setNewFromDate] = useState("");
  const [newToDate, setNewToDate] = useState("");
  const [newReasonforleave, setNewReasonforleave] = useState("");
  const [newStatus, setNewStatus] = useState("");


  const addNewLeaveApplication = (event) => {
    event.preventDefault();

    setLoading(true);

    const leaveApplicationObject = new FormData();
    leaveApplicationObject.append("Leavetype", newLeavetype);
    leaveApplicationObject.append("FromDate", newFromDate);
    leaveApplicationObject.append("ToDate", newToDate);
    leaveApplicationObject.append("Reasonforleave", newReasonforleave);
    leaveApplicationObject.append("Status", newStatus);

leaveService
.createLeaveApplication(leaveApplicationObject)
.then((returnedLeaveApplication) => {
  setLeaveApplications(leaveApplications.concat(returnedLeaveApplication));

  setNewLeavetype("");
  setNewFromDate("");
  setNewToDate("");
  setNewReasonforleave("");
  setNewStatus("");
  
}).catch((error) => console.log(error))
.finally(() => setLoading(false));

return (
<form onSubmit={addNewLeaveApplication} className="mt-8 space-y-6">

<h1>Total File Leaves:{" "}
<span className="bg-green-500 text-white font-bold w-24 py-2 px-3">
{leaveapplications.length}
</span></h1>

<div className="flex flex-col">
        <label>Leave Type</label>
        <select
          id="leavetype"
          name="leavetype"
          value={newLeavetype}
          onChange={(event) => setNewLeavetype(event.target.value)}
        >
          <option value="sickleave">Sick Leave</option>
          <option value="unpaidleave">Unpaid Leave</option>
          <option value="emergencyleave">Emergency Leave</option>
        </select>
      </div>

      
      <div className="flex flex-col">
        <label>From Date</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-2"
          type="date"
          value={newFromDate}
          onChange={(event) => setNewFromDate(event.target.value)}
        />
      </div>

      
      <div className="flex flex-col">
        <label>To Date</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-2"
          type="date"
          value={newToDate}
          onChange={(event) => setNewToDate(event.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label>Reason for Leave</label>
        <input
          className="flex items-center justify-between bg-white rounded-lg shadow-md w-64 p-2 mb-1"
          type="text"
          value={newReasonforleave}
          onChange={(event) => setNewReasonforleave(event.target.value)}
          placeholder="Enter your reason for leave"
        />
      </div>

      <div className="flex flex-col">
        <label>Status</label>
        <select
          id="status"
          name="status"
          value={newStatus}
          onChange={(event) => setNewStatus(event.target.value)}
        >
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="notapproved">Not Approved</option>
        </select>
      </div>

</form>


);
}

export default LeaveForm;
