import { Link, NavLink } from "react-router-dom";
import imageUrl from "../assets/images/avatar-svgrepo-com.svg";

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
        <Link to="login" className="login-link"><img src={imageUrl} className="login-icon"/></Link>
      </nav>
    </header>
  );
}
