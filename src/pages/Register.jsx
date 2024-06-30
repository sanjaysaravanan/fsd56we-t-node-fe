// prompt
// react Register component with a form to enter name, mobile, email, password, dob

// Register.js
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../apis";

const initialState = {
  name: "",
  mobile: "",
  email: "",
  password: "",
  dob: "",
  role: "student",
};
function Register() {
  const authStatus = localStorage.getItem("authStatus");
  const [form, setForm] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add form validation and API call here
    await registerUser(form);

    // reset the form
    setForm(initialState);

    navigate("/login");
  };

  if (authStatus === "authenticated") {
    console.log("Already Authenticated");
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
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
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button
          type="submit"
          style={{ float: "left" }}
          className="btn btn-primary mt-4"
        >
          Register
        </button>
        <Link to="/login" style={{ float: "right" }} className="mt-4">
          Go to Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
