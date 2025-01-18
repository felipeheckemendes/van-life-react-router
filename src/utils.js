import { redirect } from "react-router-dom";

export async function requireAuth({ request }) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("loggedIn") === "true" ? true : false;
  const response = redirect(
    `/login?message=You must login first.${
      pathname ? "&redirectTo=" + pathname : ""
    }`
  );

  if (!isLoggedIn) {
    return Object.defineProperty(response, "body", { value: true });
  }
  return null;
}
