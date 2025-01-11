import { useOutletContext } from "react-router";

export default function HostVanInfo() {
  const [van, setVan] = useOutletContext();

  return (
    <>
      <section className="host-van-detail-info">
        <h4>Name: {van.name}</h4>
        <h4>Category: {van.type}</h4>
        <h4>Description: {van.description}</h4>
        <h4>Visibility: Public</h4>
      </section>
    </>
  );
}
