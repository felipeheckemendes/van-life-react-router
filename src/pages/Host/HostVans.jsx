import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import React from "react";
export default function HostVans() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/host/vans").then((res) => {
      res.json().then((data) => setVans(data.vans));
    });
  }, []);

  const vansCards = vans.map((van) => (
    <Link to={`${van.id}`} key={van.id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <>
      <h1>Your listed vans</h1>
      {vansCards}
    </>
  );
}
