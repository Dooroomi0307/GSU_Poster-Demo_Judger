import React, { useState } from "react";
import "./styles.css";

function Navbar(){
  const path = window.location.pathname;
  const handleLogout = () => {

    window.location.href = "/";
  };

  return <nav className="nav">
  
    <ul>
      <CustomLink href="/partlist">Participant List</CustomLink>
      <CustomLink href="/vote">Vote</CustomLink>
      <CustomLink href="/winner">Winner Announcer</CustomLink>
      
    </ul>
    <div className="logout-container">
      <button class="logout-button" onClick={handleLogout}>Logout</button>
    </div>    
  </nav>
}

function CustomLink({href, children, ...props}) {
  const path = window.location.pathname;

  return (
    <li className={path === href ? "active" : ""}>
      <a href={href} {...props}>{children}
    </a>
  </li>  
  )
}
export default Navbar