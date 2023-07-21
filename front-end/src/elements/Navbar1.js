import React, { useState } from "react";
import "./styles.css";

function Navbar1(){
    const path = window.location.pathname;
    const handleLogout = () => {

      window.location.href = "/";
    };

    return <nav className="nav">
    
      <ul>
        <CustomLink href="/participantlist">Participant List</CustomLink>
        <CustomLink href="/analysis">Analysis</CustomLink>
        <CustomLink href="/candidatelist">Candidate List</CustomLink>
        <CustomLink href="/adminpanel">Admin Panel</CustomLink>
        
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
  export default Navbar1