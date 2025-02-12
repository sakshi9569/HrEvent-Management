import React from "react";

const Sidebar = () => {
  return (
    <aside>
      <h2>Menu</h2>
      <ul>
        <li>
          <a href="/admindashboard">Admin Dashboard</a>
        </li>
        <li>
          <a href="/userdashboard">User Dashboard</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;