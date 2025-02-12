
import React from "react";

const PublicHeader = () => {
  return (
    <header>
      <h1>Welcome to the Public Area</h1>
      <nav>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
      </nav>
    </header>
  );
};

export default PublicHeader;