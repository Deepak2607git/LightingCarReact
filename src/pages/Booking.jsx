import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = "https://localhost:63621";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const car = location.state?.car;

  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
    fromLocation: "",
    toLocation: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // If user directly opens /booking without selecting a car
  if (!car) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f6f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "14px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
            textAlign: "center",
            maxWidth: "450px",
            width: "100%",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#111111",
            }}
          >
            No car selected
          </h2>

          <p
            style={{
              color: "#666666",
              marginBottom: "25px",
            }}
          >
            Please select a car before creating a booking.
          </p>

          <button
            type="button"
            onClick={() => navigate("/cars")}
            style={{
              padding: "12px 22px",
              border: "none",
              borderRadius: "7px",
              backgroundColor: "#111111",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
  }

  function convertToUtc(date, time) {
    if (!date || !time) {
      return null;
    }

    const localDateTime = new Date(`${date}T${time}`);

    if (Number.isNaN(localDateTime.getTime())) {
      return null;
    }

    return localDateTime.toISOString();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (
      !formData.pickupDate ||
      !formData.pickupTime ||
      !formData.dropDate ||
      !formData.dropTime ||
      !formData.fromLocation ||
      !formData.toLocation ||
      !formData.phoneNumber
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const pickupDate = convertToUtc(
      formData.pickupDate,
      formData.pickupTime
    );

    const dropDate = convertToUtc(
      formData.dropDate,
      formData.dropTime
    );

    if (!pickupDate || !dropDate) {
      setErrorMessage("Please enter valid pickup and drop date/time.");
      return;
    }

    if (new Date(dropDate) <= new Date(pickupDate)) {
      setErrorMessage(
        "Drop date and time must be after pickup date and time."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/Bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          carType: car.name,
          pickupDate: pickupDate,
          dropDate: dropDate,
          fromLocation: formData.fromLocation,
          toLocation: formData.toLocation,
          phoneNumber: formData.phoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to create booking."
        );
      }

      setSuccessMessage("Booking created successfully.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      console.error("Booking error:", error);

      setErrorMessage(
        error.message || "Something went wrong while creating the booking."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f6f8",
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto 30px",
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/cars")}
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            color: "#555555",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "15px",
          }}
        >
          ← Back to Cars
        </button>

        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "30px",
            color: "#111111",
          }}
        >
          Book Your Car
        </h1>

        <p
          style={{
            margin: 0,
            color: "#666666",
          }}
        >
          Enter your trip details below
        </p>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "14px",
          padding: "30px",
          boxSizing: "border-box",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Selected Car */}

        <div
          style={{
            backgroundColor: "#f5f6f8",
            borderRadius: "10px",
            padding: "18px",
            marginBottom: "25px",
          }}
        >
          <p
            style={{
              margin: "0 0 6px",
              fontSize: "13px",
              color: "#777777",
            }}
          >
            Selected Car
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  color: "#111111",
                }}
              >
                {car.name}
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#666666",
                  fontSize: "14px",
                }}
              >
                {car.type} • {car.seats} Seats • {car.transmission}
              </p>
            </div>

            <div
              style={{
                whiteSpace: "nowrap",
              }}
            >
              <strong
                style={{
                  fontSize: "21px",
                  color: "#111111",
                }}
              >
                ₹{car.price}
              </strong>

              <span
                style={{
                  color: "#777777",
                  fontSize: "13px",
                }}
              >
                {" "}
                / day
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Pickup / Drop */}

        <div
        style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "20px",
        }}
        >
        {/* Pickup Date + Time */}

        <div>
            <label style={labelStyle}>
            Pickup Date & Time
            </label>

            <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
            }}
            >
            <input
                id="pickupDate"
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                style={inputStyle}
                required
            />

            <input
                id="pickupTime"
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                style={inputStyle}
                required
            />
            </div>
        </div>

        {/* Drop Date + Time */}

        <div>
            <label style={labelStyle}>
            Drop Date & Time
            </label>

            <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
            }}
            >
            <input
                id="dropDate"
                type="date"
                name="dropDate"
                value={formData.dropDate}
                onChange={handleChange}
                min={
                formData.pickupDate ||
                new Date().toISOString().split("T")[0]
                }
                style={inputStyle}
                required
            />

            <input
                id="dropTime"
                type="time"
                name="dropTime"
                value={formData.dropTime}
                onChange={handleChange}
                style={inputStyle}
                required
            />
            </div>
        </div>
        </div>


          {/* Locations */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {/* From */}

            <div>
              <label
                htmlFor="fromLocation"
                style={labelStyle}
              >
                From Location
              </label>

              <input
                id="fromLocation"
                type="text"
                name="fromLocation"
                value={formData.fromLocation}
                onChange={handleChange}
                placeholder="Enter pickup location"
                style={inputStyle}
                required
              />
            </div>

            {/* To */}

            <div>
              <label
                htmlFor="toLocation"
                style={labelStyle}
              >
                To Location
              </label>

              <input
                id="toLocation"
                type="text"
                name="toLocation"
                value={formData.toLocation}
                onChange={handleChange}
                placeholder="Enter drop location"
                style={inputStyle}
                required
              />
            </div>
          </div>

          {/* Phone */}

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <label
              htmlFor="phoneNumber"
              style={labelStyle}
            >
              Phone Number
            </label>

            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              maxLength="20"
              style={inputStyle}
              required
            />
          </div>

          {/* Error */}

          {errorMessage && (
            <div
              style={{
                marginTop: "20px",
                padding: "12px 15px",
                borderRadius: "7px",
                backgroundColor: "#fff1f1",
                color: "#c62828",
                fontSize: "14px",
              }}
            >
              {errorMessage}
            </div>
          )}

          {/* Success */}

          {successMessage && (
            <div
              style={{
                marginTop: "20px",
                padding: "12px 15px",
                borderRadius: "7px",
                backgroundColor: "#eef9f0",
                color: "#2e7d32",
                fontSize: "14px",
              }}
            >
              {successMessage}
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: loading ? "#777777" : "#111111",
              color: "#ffffff",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            {loading ? "Creating Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  color: "#333333",
  fontSize: "14px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #dddddd",
  borderRadius: "7px",
  boxSizing: "border-box",
  fontSize: "14px",
  color: "#111111",
  backgroundColor: "#ffffff",
  outline: "none",
};

export default Booking;