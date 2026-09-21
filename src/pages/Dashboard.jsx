import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!savedUser || !token) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      fetchBookings(token);
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  async function fetchBookings(token) {
    try {
      setLoadingBookings(true);
      setBookingError("");

      const response = await fetch(
        `${API_BASE_URL}/api/Bookings/my`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to load bookings."
        );
      }

      setBookings(data);
    } catch (error) {
      console.error("Booking loading error:", error);

      setBookingError(
        error.message || "Unable to load your bookings."
      );
    } finally {
      setLoadingBookings(false);
    }
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  }

  function formatDateTime(dateValue) {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStatusStyle(status) {
    switch (status) {
      case "CONFIRMED":
        return {
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
        };

      case "CANCELLED":
        return {
          backgroundColor: "#ffebee",
          color: "#c62828",
        };

      case "COMPLETED":
        return {
          backgroundColor: "#e3f2fd",
          color: "#1565c0",
        };

      case "PENDING":
      default:
        return {
          backgroundColor: "#fff8e1",
          color: "#f57c00",
        };
    }
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
      {/* ================= HEADER ================= */}

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

      {/* ================= DASHBOARD ================= */}

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

        {/* ================= USER INFORMATION ================= */}

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

        {/* ================= CARS BUTTON ================= */}

        <button
          type="button"
          onClick={() => navigate("/carsMenu")}
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

        {/* ================= MY BOOKINGS ================= */}

        <section
          style={{
            marginTop: "40px",
          }}
        >
          <h2
            style={{
              marginBottom: "8px",
              color: "#111111",
            }}
          >
            My Bookings
          </h2>

          <p
            style={{
              color: "#666666",
              marginTop: 0,
              marginBottom: "20px",
            }}
          >
            Your recent rental bookings
          </p>

          {/* Loading */}

          {loadingBookings && (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "30px",
                borderRadius: "12px",
                textAlign: "center",
                color: "#666666",
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              }}
            >
              Loading your bookings...
            </div>
          )}

          {/* Error */}

          {!loadingBookings && bookingError && (
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "25px",
                borderRadius: "12px",
                color: "#c62828",
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              }}
            >
              {bookingError}

              <br />

              <button
                type="button"
                onClick={() => {
                  const token =
                    localStorage.getItem("token");

                  if (token) {
                    fetchBookings(token);
                  }
                }}
                style={{
                  marginTop: "15px",
                  padding: "9px 16px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "#111111",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* No Bookings */}

          {!loadingBookings &&
            !bookingError &&
            bookings.length === 0 && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "40px",
                  borderRadius: "12px",
                  textAlign: "center",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "10px",
                  }}
                >
                  🚗
                </div>

                <h3
                  style={{
                    margin: "0 0 8px",
                  }}
                >
                  No bookings yet
                </h3>

                <p
                  style={{
                    color: "#666666",
                  }}
                >
                  You haven't booked a car yet.
                </p>

                {/* <button
                  type="button"
                  onClick={() => navigate("/carsMenu")}
                  style={{
                    marginTop: "10px",
                    padding: "11px 18px",
                    border: "none",
                    borderRadius: "7px",
                    backgroundColor: "#111111",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  Browse Cars
                </button> */}
              </div>
            )}

          {/* Booking List */}

          {!loadingBookings &&
            !bookingError &&
            bookings.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gap: "20px",
                }}
              >
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "25px",
                      borderRadius: "12px",
                      boxShadow:
                        "0 4px 15px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Booking Header */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "15px",
                        flexWrap: "wrap",
                        marginBottom: "20px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            marginBottom: "5px",
                          }}
                        >
                          Booking ID
                        </div>

                        <h3
                          style={{
                            margin: 0,
                            color: "#111111",
                          }}
                        >
                          #{booking.id}
                        </h3>
                      </div>

                      <span
                        style={{
                          ...getStatusStyle(
                            booking.status
                          ),
                          padding: "7px 14px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Car */}

                    <div
                      style={{
                        backgroundColor: "#f5f6f8",
                        padding: "15px",
                        borderRadius: "9px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#888888",
                          marginBottom: "5px",
                        }}
                      >
                        Car
                      </div>

                      <strong
                        style={{
                          fontSize: "18px",
                          color: "#111111",
                        }}
                      >
                        🚗 {booking.carType}
                      </strong>
                    </div>

                    {/* Booking Details */}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      <BookingDetail
                        label="Pickup"
                        value={formatDateTime(
                          booking.pickupDate
                        )}
                      />

                      <BookingDetail
                        label="Drop"
                        value={formatDateTime(
                          booking.dropDate
                        )}
                      />

                      <BookingDetail
                        label="From"
                        value={booking.fromLocation}
                      />

                      <BookingDetail
                        label="To"
                        value={booking.toLocation}
                      />

                      <BookingDetail
                        label="Phone"
                        value={booking.phoneNumber}
                      />

                      <BookingDetail
                        label="Email"
                        value={booking.email}
                      />
                    </div>

                    {/* Created Date */}

                    <div
                      style={{
                        borderTop:
                          "1px solid #eeeeee",
                        marginTop: "20px",
                        paddingTop: "15px",
                        fontSize: "12px",
                        color: "#888888",
                      }}
                    >
                      Booking created:{" "}
                      {formatDateTime(
                        booking.createdAt
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </section>
      </main>
    </div>
  );
}

function BookingDetail({ label, value }) {
  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          color: "#888888",
          marginBottom: "5px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "14px",
          color: "#222222",
          fontWeight: "500",
          wordBreak: "break-word",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}