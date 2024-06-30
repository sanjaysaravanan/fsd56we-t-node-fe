// prompt
// react Login component with a form to enter mobile or email & password

// Login.js
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../apis";

function Login() {
  const authStatus = localStorage.getItem("authStatus");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", form);
    try {
      const { userToken } = await loginUser(form);
      localStorage.setItem("authStatus", "authenticated");
      localStorage.setItem("authToken", userToken);
      navigate("/");
    } catch (e) {
      console.log("Error:", e);
      alert(e.message);
    }
  };

  if (authStatus === "authenticated") {
    console.log("Already Authenticated");
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="identifier">Mobile or Email</label>
          <input
            type="text"
            className="form-control"
            id="identifier"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
