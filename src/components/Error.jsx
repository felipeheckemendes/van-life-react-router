import { useRouteError } from "react-router";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <h4>Error: {error.message}</h4>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </>
  );
}
