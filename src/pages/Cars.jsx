import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const cars = [
  {
    id: 1,
    name: "Toyota Innova Crysta",
    type: "SUV",
    seats: 7,
    transmission: "Automatic",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 2,
    name: "Hyundai Creta",
    type: "SUV",
    seats: 5,
    transmission: "Automatic",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 3,
    name: "Maruti Swift",
    type: "Hatchback",
    seats: 5,
    transmission: "Manual",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 4,
    name: "Mahindra XUV700",
    type: "SUV",
    seats: 7,
    transmission: "Automatic",
    price: 2800,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

function CarCard({ car }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Automatically change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) =>
        previous === car.images.length - 1 ? 0 : previous + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [car.images.length]);

  function nextImage() {
    setCurrentImage((previous) =>
      previous === car.images.length - 1 ? 0 : previous + 1
    );
  }

  function previousImage() {
    setCurrentImage((previous) =>
      previous === 0 ? car.images.length - 1 : previous - 1
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Image Slider */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "220px",
          overflow: "hidden",
        }}
      >
        <img
          src={car.images[currentImage]}
          alt={`${car.name} ${currentImage + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Previous Arrow */}
        <button
          type="button"
          onClick={previousImage}
          aria-label="Previous image"
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            margin: 0,
            lineHeight: 1,
            zIndex: 2,
          }}
        >
          ‹
        </button>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={nextImage}
          aria-label="Next image"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            margin: 0,
            lineHeight: 1,
            zIndex: 2,
          }}
        >
          ›
        </button>

        {/* Image Dots */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
            zIndex: 2,
          }}
        >
          {car.images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              aria-label={`Show image ${index + 1}`}
              style={{
                width: "8px",
                height: "8px",
                padding: 0,
                margin: 0,
                border: "none",
                borderRadius: "50%",
                backgroundColor:
                  currentImage === index
                    ? "#fff"
                    : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Car Details */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{
            margin: "0 0 10px 0",
            fontSize: "21px",
          }}
        >
          {car.name}
        </h2>

        <p
          style={{
            color: "#666",
            margin: 0,
          }}
        >
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
            <strong
              style={{
                fontSize: "22px",
              }}
            >
              ₹{car.price}
            </strong>

            <span
              style={{
                color: "#777",
                marginLeft: "4px",
              }}
            >
              / day
            </span>
          </div>

          <button
            type="button"
            onClick={() => alert(`Selected ${car.name}`)}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#111",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

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
        boxSizing: "border-box",
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

        {/* Logout */}
        <button
          type="button"
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

      {/* Page Title */}
      <h1
        style={{
          margin: "0 0 8px",
        }}
      >
        Available Cars
      </h1>

      <p
        style={{
          color: "#666",
          margin: "0 0 30px",
        }}
      >
        Choose a car for your journey
      </p>

      {/* Car Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

export default Cars;