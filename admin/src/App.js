import React, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import Header from "./components/header/header";
import JobList from "./Pages/joblist/joblist";
import AddJobForm from "./Pages/addjob/addjob";
import UpdateStatus from "./Pages/updatestatus/updatestatus";

function App() {
  const [showJobList, setShowJobList] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [showHome, setShowHome] = useState(true); 

  return (
    <div className={showAddJob ? "blur-background" : ""}>
      <Navbar
        setShowJobList={setShowJobList}
        setShowAddJob={setShowAddJob}
        setShowUpdateStatus={setShowUpdateStatus}
        setShowHome={setShowHome}
      />

      {showHome && <Header />}

     
      {showJobList && <JobList />}

      
      {showAddJob && (
        <div className="overlay">
          <AddJobForm onClose={() => setShowAddJob(false)} />
        </div>
      )}

      
      {showUpdateStatus && <UpdateStatus />}
    </div>
  );
}

export default App;
