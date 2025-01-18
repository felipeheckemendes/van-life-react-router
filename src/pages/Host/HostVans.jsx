import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

// prettier-ignore
export function loader() {
  const vansPromise = fetch("/api/host/vans")
    .then((res) => res.json())
    .then((data) => data.vans);
  return { vansPromise }
  }

export default function HostVans() {
  const vansPromise = useLoaderData().vansPromise;

  function renderVans(vans) {
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

    return vansCards;
  }

  return (
    <>
      <h1>Your listed vans</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={vansPromise}>{renderVans}</Await>
      </Suspense>
    </>
  );
}
