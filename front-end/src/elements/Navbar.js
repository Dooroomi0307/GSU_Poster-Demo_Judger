function Navbar(){
  const path = window.location.pathname;
  return <nav className="nav">
  
    <ul>
      <CustomLink href="/partlist">Participant List</CustomLink>
      <CustomLink href="/vote">Vote</CustomLink>
      
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
export default Navbar