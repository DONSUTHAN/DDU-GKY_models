import React from "react";
import { UserPlus } from "lucide-react";
// This line imports the register icon.

import { useState } from "react";
// This line imports useState for register form values.

import { registerUser, saveAuth } from "../../api/api.js";
// This line imports register API and save helper functions.

import "../Login/Login.css";
// This line reuses the auth page CSS from Login.

function Register({ setPage, setAuth, setMessage }) {
  // This line creates the Register page component.
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", role: "consumer" });
  // This line stores register form input values.

  const updateInput = (event) => {
    // This line creates a function for updating form values.
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // This line updates only the input that changed.
  };
  // This line ends the updateInput function.

  const submitRegister = async (event) => {
    // This line creates the register submit function.
    event.preventDefault();
    // This line stops the browser from refreshing the page.
    try {
      // This line starts a try block for safe API registration.
      const authData = await registerUser(formData);
      // This line sends register data to the backend.
      saveAuth(authData);
      // This line saves login data after successful registration.
      setAuth(authData);
      // This line updates login state in App.
      setMessage(`Account created for ${authData.user.name}`);
      // This line shows a success message.
      setPage("dashboard");
      // This line opens the dashboard after registration.
    } catch (error) {
      // This line catches registration errors.
      setMessage(error.message);
      // This line shows the registration error message.
    }
  };
  // This line ends the submitRegister function.

  return (
    // This line starts the register page JSX.
    <section className="auth-page">
      {/* This line creates the register page section. */}
      <form className="auth-card" onSubmit={submitRegister}>
        {/* This line creates the register form card. */}
        <p className="section-label">New account</p>
        {/* This line shows the new account label. */}
        <h1>Create your The Farm Vegi account</h1>
        {/* This line shows the register heading. */}
        <label>
          {/* This line starts the name label. */}
          Full name
          {/* This line shows the name label text. */}
          <input name="name" value={formData.name} onChange={updateInput} required />
          {/* This line creates the name input. */}
        </label>
        {/* This line ends the name label. */}
        <label>
          {/* This line starts the email label. */}
          Email
          {/* This line shows the email label text. */}
          <input name="email" type="email" value={formData.email} onChange={updateInput} required />
          {/* This line creates the email input. */}
        </label>
        {/* This line ends the email label. */}
        <label>
          {/* This line starts the phone label. */}
          Phone
          {/* This line shows the phone label text. */}
          <input name="phone" value={formData.phone} onChange={updateInput} required />
          {/* This line creates the phone input. */}
        </label>
        {/* This line ends the phone label. */}
        <label>
          {/* This line starts the password label. */}
          Password
          {/* This line shows the password label text. */}
          <input name="password" type="password" minLength="6" value={formData.password} onChange={updateInput} required />
          {/* This line creates the password input. */}
        </label>
        {/* This line ends the password label. */}
        <label>
          {/* This line starts the role label. */}
          Role
          {/* This line shows the role label text. */}
          <select name="role" value={formData.role} onChange={updateInput}>
            {/* This line creates the role dropdown. */}
            <option value="consumer">Consumer</option>
            {/* This line creates the consumer option. */}
            <option value="farmer">Farmer</option>
            {/* This line creates the farmer option. */}
          </select>
          {/* This line ends the role dropdown. */}
        </label>
        {/* This line ends the role label. */}
        <button className="primary-button auth-submit">
          {/* This line creates the register submit button. */}
          <UserPlus size={18} />
          {/* This line shows the register icon. */}
          Create account
          {/* This line labels the register button. */}
        </button>
        {/* This line ends the register submit button. */}
        <button type="button" className="auth-link" onClick={() => setPage("login")}>
          {/* This line opens the login page. */}
          Already have an account? Sign in
          {/* This line labels the login navigation button. */}
        </button>
        {/* This line ends the login navigation button. */}
      </form>
      {/* This line ends the register form card. */}
    </section>
    // This line ends the register page JSX.
  );
  // This line ends the return statement.
}
// This line ends the Register component.

export default Register;
// This line exports Register so App can use it.
