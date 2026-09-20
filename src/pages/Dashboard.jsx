import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    } catch {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  }

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f6f8",
      }}
    >
      {/* Header */}

      <header
        style={{
          backgroundColor: "#ffffff",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          🚗 Lightning Cars
        </div>

        <button
          type="button"
          onClick={logout}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "7px",
            backgroundColor: "#111111",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      {/* Dashboard */}

      <main
        style={{
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1>
          Welcome, {user.fullName || "User"} 👋
        </h1>

        <p
          style={{
            color: "#666666",
          }}
        >
          Welcome to your Lightning Cars dashboard.
        </p>

        {/* User Information */}

        <div
          style={{
            marginTop: "30px",
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
          }}
        >
          <h2>Account Information</h2>

          <p>
            <strong>Name:</strong> {user.fullName}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>

        {/* Cars Button */}

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            marginTop: "25px",
            padding: "12px 20px",
            border: "none",
            borderRadius: "7px",
            backgroundColor: "#111111",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Browse Cars
        </button>
      </main>
    </div>
  );
}