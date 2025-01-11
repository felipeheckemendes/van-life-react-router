// import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const styleActiveNav = ({ isActive }) => {
    return isActive ? "nav-active" : null;
  };

  //prettier-ignore
  return (
    <>
      <nav className="host-nav">
        <NavLink className={styleActiveNav} end to="">Dashboard</NavLink>
        <NavLink className={styleActiveNav} to="vans">Vans</NavLink>
        <NavLink className={styleActiveNav} to="reviews">Reviews</NavLink>
        <NavLink className={styleActiveNav} to="income">Income</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
