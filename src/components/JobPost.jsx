import { useState, useEffect } from "react";

function JobPost () {
  const jobs = [{ id: 1, text: "Frontend Developer" }, { id: 2, text: "Backend Developer" }];
  // const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState("");


  // useEffect(() => {
  //   const storedJobs = JSON.parse(window.localStorage.getItem("jobs")) || [];
  //   setJobs(storedJobs);
  // }, []);

  useEffect(() => {
    window.localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newJob.trim()) return;
    setJobs([...jobs, { id: Date.now(), text: newJob }]);
    setNewJob("");
  };

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    jobs(updatedJobs);
    alert("Job vacancies updated!");
  };

  return (
  <div className="fixed top-24 bottom-5 right-8 m-4 border border-gray-300 rounded-xl bg-[#FAF7F7] w-96 h-3/4 overflow-y-auto z-0 p-4 shadow-md">
  <h1 className="text-2xl font-bold mb-4">Job Vacancies</h1>
  <form className="flex mb-4" onSubmit={handleSubmit}>
    <input
      className="border border-gray-300 px-4 py-2 rounded-2xl mr-2 w-md focus:outline-none focus:ring focus:border-blue-300"
      type="text"
      placeholder="Enter job title"
      value={newJob}
      onChange={(event) => setNewJob(event.target.value)}
    />
    <button
      className="bg-purple-500 hover:bg-purple-700 text-white px-2 py-0.5 rounded-xl w-md"
      type="submit"
    >
      Add New Job
    </button>
  </form>
  <ul>
    {jobs.map((job) => (
      <li key={job.id} className="flex items-center justify-between mb-2">
        {job.text}
        <button
          className="text-purple-500 hover:text-purple-600 focus:outline-none"
          onClick={() => handleDelete(job.id)}
        >
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              className="heroicon-ui"
              d="M6 6h2V4c0-1.1.9-2 2-2h4a2 2 0 012 2v2h2a1 1 0 010 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 010-2zm2-2v2h8V4H8zm2 10a1 1 0 100 2h4a1 1 0 100-2h-4zm-4 0a1 1 0 100 2h4a1 1 0 100-2H8zm5-8H9v2h2V4z"
            />
          </svg>
        </button>
      </li>
    ))}
    <hr className="my-4"  />
    <h2 className="text-xl font-bold mb-2">Company News and Events</h2>
  </ul>
</div>

  );
};

export default JobPost
