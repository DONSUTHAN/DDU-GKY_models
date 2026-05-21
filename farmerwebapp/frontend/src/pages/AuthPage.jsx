import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AuthPage({ mode }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const isRegister = mode === "register";
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "consumer",
    phone: "",
    location: ""
  });

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await register(form);
      } else {
        await login({ email: form.email, password: form.password });
      }
      navigate("/");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <p className="eyebrow">{isRegister ? "Create account" : "Welcome back"}</p>
        <h1>{isRegister ? "Join FarmDirect" : "Login"}</h1>

        {error && <p className="form-error">{error}</p>}

        {isRegister && (
          <input name="name" value={form.name} onChange={updateField} placeholder="Full name" />
        )}
        <input name="email" value={form.email} onChange={updateField} placeholder="Email" />
        <input
          name="password"
          value={form.password}
          onChange={updateField}
          placeholder="Password"
          type="password"
        />
        {isRegister && (
          <>
            <select name="role" value={form.role} onChange={updateField}>
              <option value="consumer">Consumer</option>
              <option value="farmer">Farmer</option>
            </select>
            <input name="phone" value={form.phone} onChange={updateField} placeholder="Phone" />
            <input
              name="location"
              value={form.location}
              onChange={updateField}
              placeholder="Location"
            />
          </>
        )}

        <button>{isRegister ? "Create account" : "Login"}</button>
        <a href={isRegister ? "/login" : "/register"}>
          {isRegister ? "Already have an account?" : "Create an account"}
        </a>
      </form>
    </main>
  );
}
