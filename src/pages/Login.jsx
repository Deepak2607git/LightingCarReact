import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(user));

      // If your API returns token separately,
      // keep your existing token storage here.

      // Everyone goes to dashboard
      navigate("/dashboard");
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
        {/* Logo */}

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
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666666",
            marginBottom: "25px",
          }}
        >
          Login to continue
        </p>

        {/* Error */}

        {error && (
          <div
            style={{
              backgroundColor: "#ffecec",
              color: "#d00000",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          {/* Email */}

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
              fontSize: "14px",
            }}
          />

          {/* Password */}

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
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "7px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          />

          {/* Login button */}

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

              fontSize: "15px",
              fontWeight: "600",

              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup */}

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#666666",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#111111",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sign up
          </Link>
        </p>

        {/* Back to Cars */}

        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              border: "none",
              background: "none",
              color: "#666666",
              cursor: "pointer",
            }}
          >
            ← Back to Cars
          </button>
        </div>
      </section>
    </main>
  );
}