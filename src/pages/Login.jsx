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
         navigate("/cars");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand">🚗 Lightning Cars</div>
        <h1>Welcome back</h1>
        <p className="muted">Login to continue</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={submit}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>

        <p className="switch">Don't have an account? <Link to="/signup">Sign up</Link></p>
      </section>
    </main>
  );
}
