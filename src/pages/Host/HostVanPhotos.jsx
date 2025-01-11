import { useOutletContext } from "react-router";

export default function HostVanPhotos() {
  const [van, setVan] = useOutletContext();

  return (
    <p>
      <img src={van.imageUrl} className="host-van-detail-image" />
    </p>
  );
}
