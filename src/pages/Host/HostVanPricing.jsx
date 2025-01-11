import { useOutletContext } from "react-router";

export default function HostVanPricing() {
  const [van, setVan] = useOutletContext();

  return (
    <h3 className="host-van-price">
      ${van.price}
      <span>/day</span>
    </h3>
  );
}