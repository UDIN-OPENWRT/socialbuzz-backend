require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// Token rahasia untuk verifikasi SocialBuzz
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "sbwhook-lix9tqznbsgkol0dvm4o3r6e";

// Endpoint test
app.get("/", (req, res) => {
  res.send("✅ SocialBuzz Backend Aktif di Render.com");
});

// Webhook endpoint
app.post("/webhook/socialbuzz", (req, res) => {
  const token = req.headers["x-webhook-token"];

  if (!token || token !== WEBHOOK_SECRET) {
    console.log("❌ Token salah:", token);
    return res.status(403).send({ success: false, message: "Token invalid" });
  }

  console.log("📩 Webhook diterima:", req.body);
  res.status(200).send({ success: true });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server berjalan di port ${PORT}`));

