import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  function signOut() {
    logout();
    navigate("/login");
  }

  return (
    <main className="dashboard">
      <section className="dashboard-card">
        <h1>Welcome, {user?.fullName || "User"}</h1>
        <p>You are logged in as <strong>{user?.role || "USER"}</strong>.</p>
        <button onClick={signOut}>Logout</button>
      </section>
    </main>
  );
}
