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
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

function CarCard({ car }) {
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previous) => {
        if (previous === car.images.length - 1) {
          return 0;
        }

        return previous + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [car.images.length]);

  function nextImage() {
    setCurrentImage((previous) => {
      if (previous === car.images.length - 1) {
        return 0;
      }

      return previous + 1;
    });
  }

  function previousImage() {
    setCurrentImage((previous) => {
      if (previous === 0) {
        return car.images.length - 1;
      }

      return previous - 1;
    });
  }

  function bookCar() {
    navigate("/login");
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease",
      }}
    >
      {/* ================= IMAGE SLIDER ================= */}

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "230px",
          overflow: "hidden",
          backgroundColor: "#eee",
        }}
      >
        <img
          src={car.images[currentImage]}
          alt={car.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Previous Button */}

        <button
          type="button"
          onClick={previousImage}
          aria-label="Previous image"
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",

            width: "38px",
            height: "38px",

            padding: 0,
            margin: 0,

            border: "none",
            borderRadius: "50%",

            backgroundColor: "rgba(0,0,0,0.55)",
            color: "#ffffff",

            fontSize: "27px",
            lineHeight: "1",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            cursor: "pointer",

            zIndex: 5,
          }}
        >
          ‹
        </button>

        {/* Next Button */}

        <button
          type="button"
          onClick={nextImage}
          aria-label="Next image"
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",

            width: "38px",
            height: "38px",

            padding: 0,
            margin: 0,

            border: "none",
            borderRadius: "50%",

            backgroundColor: "rgba(0,0,0,0.55)",
            color: "#ffffff",

            fontSize: "27px",
            lineHeight: "1",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            cursor: "pointer",

            zIndex: 5,
          }}
        >
          ›
        </button>

        {/* Image Dots */}

        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",

            display: "flex",
            gap: "7px",

            zIndex: 5,
          }}
        >
          {car.images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              aria-label={`Show image ${index + 1}`}
              style={{
                width: currentImage === index ? "20px" : "8px",
                height: "8px",

                padding: 0,
                margin: 0,

                border: "none",
                borderRadius: "10px",

                backgroundColor:
                  currentImage === index
                    ? "#ffffff"
                    : "rgba(255,255,255,0.6)",

                cursor: "pointer",

                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* ================= CAR DETAILS ================= */}

      <div
        style={{
          padding: "20px",
        }}
      >
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "21px",
            color: "#111111",
          }}
        >
          {car.name}
        </h2>

        <p
          style={{
            margin: "0",
            color: "#666666",
            fontSize: "14px",
          }}
        >
          {car.type} • {car.seats} Seats • {car.transmission}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "22px",
          }}
        >
          {/* Price */}

          <div>
            <span
              style={{
                fontSize: "23px",
                fontWeight: "700",
                color: "#111111",
              }}
            >
              ₹{car.price}
            </span>

            <span
              style={{
                marginLeft: "5px",
                color: "#777777",
                fontSize: "14px",
              }}
            >
              / day
            </span>
          </div>

          {/* Book */}

          <button
            type="button"
            onClick={bookCar}
            style={{
              padding: "11px 18px",
              border: "none",
              borderRadius: "7px",

              backgroundColor: "#111111",
              color: "#ffffff",

              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
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

  function goToLogin() {
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
      {/* ================= HEADER ================= */}

      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        {/* Logo */}

        <div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#111111",
            }}
          >
            🚗 Lightning Cars
          </div>

          <p
            style={{
              margin: "6px 0 0",
              color: "#666666",
              fontSize: "14px",
            }}
          >
            Find your perfect rental car
          </p>
        </div>

        {/* Login */}

        <button
          type="button"
          onClick={goToLogin}
          style={{
            padding: "11px 24px",

            border: "none",
            borderRadius: "7px",

            backgroundColor: "#111111",
            color: "#ffffff",

            fontSize: "15px",
            fontWeight: "600",

            cursor: "pointer",
          }}
        >
          Login
        </button>
      </header>

      {/* ================= PAGE TITLE ================= */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "30px",
            color: "#111111",
          }}
        >
          Available Cars
        </h1>

        <p
          style={{
            margin: 0,
            color: "#666666",
          }}
        >
          Choose a car for your journey
        </p>
      </div>

      {/* ================= CAR GRID ================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          maxWidth: "1400px",
          margin: "0 auto",
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