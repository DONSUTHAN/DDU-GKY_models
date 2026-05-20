import React from "react";
import { LogIn } from "lucide-react";
// This line imports the login icon.

import { useState } from "react";
// This line imports useState for login form values.

import { loginUser, saveAuth } from "../../api/api.js";
// This line imports login API and save helper functions.

import "./Login.css";
// This line imports login page styles from an external CSS file.

function Login({ setPage, setAuth, setMessage }) {
  // This line creates the Login page component.
  const [formData, setFormData] = useState({ email: "", password: "" });
  // This line stores login form input values.

  const updateInput = (event) => {
    // This line creates a function for updating form values.
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // This line updates only the input that changed.
  };
  // This line ends the updateInput function.

  const submitLogin = async (event) => {
    // This line creates the login submit function.
    event.preventDefault();
    // This line stops the browser from refreshing the page.
    try {
      // This line starts a try block for safe API login.
      const authData = await loginUser(formData);
      // This line sends login data to the backend.
      saveAuth(authData);
      // This line saves login data in localStorage.
      setAuth(authData);
      // This line updates login state in App.
      setMessage(`Welcome back, ${authData.user.name}`);
      // This line shows a welcome message.
      setPage("dashboard");
      // This line opens the dashboard after login.
    } catch (error) {
      // This line catches login errors.
      setMessage(error.message);
      // This line shows the login error message.
    }
  };
  // This line ends the submitLogin function.

  return (
    // This line starts the login page JSX.
    <section className="auth-page">
      {/* This line creates the login page section. */}
      <form className="auth-card" onSubmit={submitLogin}>
        {/* This line creates the login form card. */}
        <p className="section-label">Account</p>
        {/* This line shows the account label. */}
        <h1>Sign in to The Farm Vegi</h1>
        {/* This line shows the login heading. */}
        <label>
          {/* This line starts the email label. */}
          Email
          {/* This line shows the email label text. */}
          <input name="email" type="email" value={formData.email} onChange={updateInput} required />
          {/* This line creates the email input. */}
        </label>
        {/* This line ends the email label. */}
        <label>
          {/* This line starts the password label. */}
          Password
          {/* This line shows the password label text. */}
          <input name="password" type="password" value={formData.password} onChange={updateInput} required />
          {/* This line creates the password input. */}
        </label>
        {/* This line ends the password label. */}
        <button className="primary-button auth-submit">
          {/* This line creates the login submit button. */}
          <LogIn size={18} />
          {/* This line shows the login icon. */}
          Sign in
          {/* This line labels the login button. */}
        </button>
        {/* This line ends the login submit button. */}
        <button type="button" className="auth-link" onClick={() => setPage("register")}>
          {/* This line opens the register page. */}
          New user? Create an account
          {/* This line labels the register navigation button. */}
        </button>
        {/* This line ends the register navigation button. */}
      </form>
      {/* This line ends the login form card. */}
    </section>
    // This line ends the login page JSX.
  );
  // This line ends the return statement.
}
// This line ends the Login component.

export default Login;
// This line exports Login so App can use it.
