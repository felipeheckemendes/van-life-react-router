import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";

export function loader({ params }) {
  return fetch(`/api/host/vans/${params.id}`).then((res) => {
    return res.json().then((data) => {
      if (data.vans.length <= 0) {
        console.log("length", data.vans.length);
        throw Error("Not found");
      }
      return data.vans[0];
    });
  });
}

export default function HostVanDetail() {
  const van = useLoaderData();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={van.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${van.type}`}>{van.type}</i>
            <h3>{van.name}</h3>
            <h4>${van.price}/day</h4>
          </div>
        </div>

        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Details
          </NavLink>

          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>

          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>

        <Outlet context={[van]} />
      </div>
    </section>
  );
}
