import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../../api";
// import { useNavigate } from "react-router-dom";

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    (async function () {
      try {
        setError(null);
        setStatus("submitting");
        const data = await loginUser(loginFormData);
        setSearchParams("");
        console.log(data);
        navigate("/host", { replace: true });
      } catch (err) {
        setError(err);
      } finally {
        setStatus("idle");
      }
    })();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message ? <h3 className="red">{message}</h3> : null}
      {error ? <h3 className="red">{error.message}</h3> : null}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in" : "Log in"}
        </button>
      </form>
    </div>
  );
}
