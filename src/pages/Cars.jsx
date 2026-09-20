import React from "react";
import { useNavigate } from "react-router-dom";

const cars = [
  {
    id: 1,
    name: "Toyota Innova Crysta",
    type: "SUV",
    seats: 7,
    transmission: "Automatic",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Hyundai Creta",
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Maruti Swift",
    type: "Hatchback",
    seats: 5,
    transmission: "Manual",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Mahindra XUV700",
    type: "SUV",
    seats: 7,
    transmission: "Automatic",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
  },
];

function Cars() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f6f8",
        padding: "30px 40px",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            🚗 Lightning Cars
          </div>

          <p
            style={{
              color: "#666",
              margin: "5px 0 0",
            }}
          >
            Find your perfect rental car
          </p>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          style={{
            padding: "10px 18px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            backgroundColor: "#fff",
            color: "#333",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Logout
        </button>
      </header>

      {/* Page title */}
      <h1 style={{ marginBottom: "8px" }}>Available Cars</h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        Choose a car for your journey
      </p>

      {/* Cars */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {cars.map((car) => (
          <div
            key={car.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={car.image}
              alt={car.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "20px" }}>
              <h2 style={{ marginTop: 0 }}>{car.name}</h2>

              <p style={{ color: "#666" }}>
                {car.type} • {car.seats} Seats • {car.transmission}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <div>
                  <strong style={{ fontSize: "22px" }}>
                    ₹{car.price}
                  </strong>
                  <span style={{ color: "#777" }}> / day</span>
                </div>

                <button
                  style={{
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "#111",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => alert(`Selected ${car.name}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;