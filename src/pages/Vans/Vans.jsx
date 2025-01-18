import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getVans } from "../../../api";
import { Suspense } from "react";

export async function loader() {
  return (async function loadVans() {
    try {
      const vansPromise = getVans();
      return { vansPromise: vansPromise };
    } catch (err) {
      console.log(err);
    }
  })();
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const vansPromise = useLoaderData().vansPromise;

  function renderVans(vans) {
    const filteredVans = !typeFilter
      ? vans
      : vans.filter((van) => van.type === typeFilter);

    console.log("Here", vans);
    const vanElements = filteredVans.map((van) => (
      <div key={van.id} className="van-tile">
        <Link
          to={`${van.id}`}
          state={{
            search: "?" + searchParams.toString(),
            type: typeFilter,
          }}
        >
          <img src={van.imageUrl} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ));

    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            onClick={handleFilterChange("type", "simple")}
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : ""
            }`}
          >
            Simple
          </button>
          <button
            onClick={handleFilterChange("type", "luxury")}
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : ""
            }`}
          >
            Luxury
          </button>
          <button
            onClick={handleFilterChange("type", "rugged")}
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : ""
            }`}
          >
            Rugged
          </button>
          {!typeFilter ? null : (
            <button
              onClick={handleFilterChange("type", null)}
              className="van-type clear-filters"
            >
              Clear filter
            </button>
          )}
        </div>
        <div className="van-list">{vanElements}</div>
      </>
    );
  }

  function handleFilterChange(key, value) {
    return () => {
      setSearchParams((prevParams) => {
        if (value === null) {
          prevParams.delete(key);
        } else {
          prevParams.set(key, value);
        }
        return prevParams;
      });
    };
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={vansPromise}>{renderVans}</Await>
      </Suspense>
    </div>
  );
}
