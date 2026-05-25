import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Keep controlled form inputs in state.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit to login or register API based on mode.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      if (isRegisterMode) {
        await register(formData);
      } else {
        await login({ email: formData.email, password: formData.password });
      }

      // If user came from another route, return there; else go to fruits page.
      const redirectTo = location.state?.from || "/fruits";
      navigate(redirectTo);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>{isRegisterMode ? "Create Account" : "Login"}</h2>

        {isRegisterMode && (
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        {errorMessage ? <p className="error-text">{errorMessage}</p> : null}

        <button type="submit" disabled={submitting}>
          {submitting ? "Please wait..." : isRegisterMode ? "Register" : "Login"}
        </button>

        <p>
          {isRegisterMode ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="switch-btn"
            onClick={() => setIsRegisterMode((previous) => !previous)}
          >
            {isRegisterMode ? "Login here" : "Create one"}
          </button>
        </p>
      </form>
    </section>
  );
};

export default Login;
