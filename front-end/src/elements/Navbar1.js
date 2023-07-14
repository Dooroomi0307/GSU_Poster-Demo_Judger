function Navbar1(){
    const path = window.location.pathname;
    return <nav className="nav">
    
      <ul>
      <CustomLink href="/participantlist">Participant List</CustomLink>
        <CustomLink href="/analysis">Analysis</CustomLink>
        
        
      </ul>
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