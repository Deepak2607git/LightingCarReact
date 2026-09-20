import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.title || "Registration failed"
        );
      }

      alert("Registration successful. Please login.");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f6f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "14px",
          padding: "35px",
          boxSizing: "border-box",
          boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          🚗 Lightning Cars
        </div>

        <h1
          style={{
            textAlign: "center",
            margin: "10px 0 5px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666666",
            marginBottom: "25px",
          }}
        >
          Create your Lightning Cars account
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#ffecec",
              color: "#d00000",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "500",
            }}
          >
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "7px",
              marginBottom: "18px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "500",
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "7px",
              marginBottom: "18px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: "500",
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            required
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "7px",
              marginBottom: "20px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "7px",
              backgroundColor: "#111111",
              color: "#ffffff",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#666666",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#111111",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}