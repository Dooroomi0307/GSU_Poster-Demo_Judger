import React, { useState } from "react";

function Navbar1(){
    const path = window.location.pathname;
    const handleLogout = () => {

      window.location.href = "/";
    };

    return <nav className="nav">
    
      <ul>
        <CustomLink href="/participantlist">Participant List</CustomLink>
        <CustomLink href="/analysis">Analysis</CustomLink>
        <CustomLink href="/adminpanel">Admin Panel</CustomLink>
        
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
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