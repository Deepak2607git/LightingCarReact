import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register(fullName, email, password);
      navigate("/login");
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
        <h1>Create account</h1>
        <p className="muted">Register as a customer</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={submit}>
          <label>Full name</label>
          <input value={fullName} onChange={e => setFullName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" minLength="6" value={password} onChange={e => setPassword(e.target.value)} required />

          <label>Confirm password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

          <button disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
        </form>

        <p className="switch">Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </main>
  );
}
