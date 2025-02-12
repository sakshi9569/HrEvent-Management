import React from "react";

const PrivateHeader = () => {
  return (
    <header>
      <h1>Welcome to the Private Area</h1>
      <nav>
        <a href="/admindashboard">Admin Dashboard</a>
        <a href="/dashboard">User Dashboard</a>
      </nav>
    </header>
  );
};

export default PrivateHeader;