import { NavLink } from "react-router-dom";

export default function Header() {
  const styleActiveNav = ({ isActive }) => {
    return isActive ? "nav-active" : null;
  };

  //prettier-ignore
  return (
    <header>
      <NavLink className="site-logo" to="/">
        #VanLife
      </NavLink>
      <nav>
        <NavLink className={styleActiveNav} to="/host">Host</NavLink>
        <NavLink className={styleActiveNav} to="/vans">Vans</NavLink>
        <NavLink className={styleActiveNav} to="/about">About</NavLink>
      </nav>
    </header>
  );
}
