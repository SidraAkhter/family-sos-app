export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://sidraakhter.app.n8n.cloud/webhook/sos-alert",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Failed" });
  }
}