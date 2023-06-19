function Attendance() {
  return (
    <div className= "fixed top-24 left-96 w-1/5 h-72 mt-4 ml-56 border border-gray-300 rounded-xl bg-[#FAF7F7] flex justify-center items-center space-y-96 space-x-96">
    <ul className="flex flex-col space-y-4">
      <li className="text-xl font-semibold justify-center items-start flex space-x-2">Present</li>
      <li>Absent</li>
      <li>Leave</li>
    </ul>
  </div>
  )
}

export default Attendance