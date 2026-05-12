import { useState } from "react";

export default function App() {
  const [status, setStatus] = useState("");

  async function sendSOS() {
    setStatus("📍 Getting location...");

    if (!navigator.geolocation) {
      setStatus("❌ GPS not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const maps = `https://maps.google.com/?q=${latitude},${longitude}`;

        const payload = {
          latitude,
          longitude,
          maps,
          time: new Date().toLocaleString(),
        };

        try {
          setStatus("🚨 Sending SOS...");

          // 🔴 IMPORTANT: yahan n8n webhook daalna hai
          const webhook =
            "https://my1stagent.app.n8n.cloud/webhook/sos-alert";

          const res = await fetch(webhook, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (res.ok) {
            setStatus("✅ SOS sent successfully!");
          } else {
            setStatus("❌ Failed to send SOS");
          }
        } catch {
          setStatus("❌ Network error");
        }
      },
      () => {
        setStatus("❌ Location permission denied");
      }
    );
  }

  return (
    <div style={styles.container}>
      <h1>🚨 Family SOS</h1>

      <p>Press button to send emergency alert</p>

      <button onClick={sendSOS} style={styles.button}>
        SOS
      </button>

      <p style={styles.status}>{status}</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#111827",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "red",
    color: "white",
    fontSize: "40px",
    fontWeight: "bold",
    border: "none",
    marginTop: "20px",
    boxShadow: "0 0 30px red",
  },
  status: {
    marginTop: "20px",
    fontSize: "18px",
  },
};