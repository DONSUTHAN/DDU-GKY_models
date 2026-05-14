import { useState } from "react";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role
      });

      alert("Registered Successfully");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="form-page">
      <form
        className="form-container"
        onSubmit={submitHandler}
      >
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="customer">
            Customer
          </option>

          <option value="farmer">
            Farmer
          </option>
        </select>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;