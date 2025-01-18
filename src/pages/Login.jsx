import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { loginUser } from "../../api";
// import { useNavigate } from "react-router-dom";

export async function action({ request }) {
  try {
    const redirectTo =
      new URL(request.url).searchParams.get("redirectTo") || "/host";
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData.entries());
    const returnData = await loginUser(credentials);
    console.log(returnData);
    localStorage.setItem("loggedIn", "true");
    const response = redirect(redirectTo);
    response.body = true;
    return response;
  } catch (err) {
    return err;
  }
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const error = useActionData();
  const navigation = useNavigation();
  localStorage.setItem("loggedIn", "false");
  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message ? <h3 className="red">{message}</h3> : null}
      {error ? <h3 className="red">{error.message}</h3> : null}
      <Form replace method="post" className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <ul className="blue">
          <p className="blue">Use testing credentials:</p>
          <li>Email: b@b.com</li>
          <li>Password: p123</li>
        </ul>
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in" : "Log in"}
        </button>
      </Form>
    </div>
  );
}
