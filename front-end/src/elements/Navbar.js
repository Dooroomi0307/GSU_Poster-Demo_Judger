function Navbar(){
  const path = window.location.pathname;
  return <nav className="nav">
  <a 
  href="/" className="site-title">
  GSU DEMO DAY
  </a>
    <ul>
      <CustomLink href="/login">Login</CustomLink>
      <CustomLink href="/participantList">Participant List</CustomLink>
      <CustomLink href="/evaluate">Evaluate</CustomLink>
      <CustomLink href="/Analysis">Analysis</CustomLink>
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