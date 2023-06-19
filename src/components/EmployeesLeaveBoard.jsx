import image from '../assets/react.svg'

function EmployeesLeaveBoard() {

  const employees = [
    {
      id: 1,
      name: 'John Doe',
      photoUrl: 'react.svg',
      onLeave: true,
    },
    {
      id: 2,
      name: 'Jane Smith',
      photoUrl: 'react.svg',
      onLeave: false,
    },
  
  ];

  return (
    <div className='fixed bottom-5 left-48 mt-11 right-8 m-4 border border-gray-300 rounded-xl bg-[#FAF7F7] w-2/4 h-2/4 overflow-y-auto z-0 p-4 shadow-md'>
      <h1>Employee Leave Board</h1>
      <div className="employee-list">
        {employees.map((employee) => (
          <div key={employee.id} className={`employee-card ${employee.onLeave ? 'on-leave' : ''}`}>
            <img src={image} alt={employee.name} />
            <p>{employee.name}</p>
            {employee.onLeave && <span className="leave-badge">On Leave</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesLeaveBoard
