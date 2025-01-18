// import React from "react";
import { Suspense } from "react";
import { Await, Link, useLoaderData, useLocation } from "react-router-dom";

export function loader(request) {
  const params = request.params;
  const fetchVan = async () => {
    const res = await fetch(`/api/vans/${params.id}`);
    const data = await res.json();
    return data;
  };
  const vanDetailsPromise = fetchVan();
  return { vanDetailsPromise };
}

export default function VanDetail() {
  const location = useLocation();
  const vanDetailsPromise = useLoaderData().vanDetailsPromise;

  function renderVanDetails(data) {
    const van = data.vans;
    return (
      <div className="van-detail">
        <Link
          to={`..${
            location.state?.search ? location.state.search.toString() : ""
          }`}
          relative="path"
          className="back-button"
        >
          &larr;{" "}
          <span>
            {location.state?.type
              ? `Back to ${location.state.type} vans`
              : "Back to all vans"}
          </span>
        </Link>
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    );
  }

  return (
    <div className="van-detail-container">
      <Suspense fallback={<h2>Loading van details...</h2>}>
        <Await resolve={vanDetailsPromise}>{renderVanDetails}</Await>
      </Suspense>
    </div>
  );
}
