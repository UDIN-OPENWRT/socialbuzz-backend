// server.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;
const WEBHOOK_SECRET = "sbwhook-lix9tqznbsgkol0dvm4o3r6e";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Tes server aktif
app.get("/", (req, res) => {
  res.send("✅ SocialBuzz backend aktif");
});

// ✅ Endpoint Webhook
app.post("/webhook/socialbuzz", (req, res) => {
  // Ambil token dari 3 tempat berbeda
  const headerToken = req.headers["x-webhook-token"];
  const bodyToken = req.body?.webhook_token;
  const queryToken = req.query?.token;

  const token = headerToken || bodyToken || queryToken;

  console.log("📦 HEADER:", req.headers);
  console.log("📦 BODY:", req.body);
  console.log("📦 Query:", req.query);
  console.log("📦 Token diterima:", token);

  // Verifikasi token
  if (!token || token !== WEBHOOK_SECRET) {
    console.log("❌ Token salah atau tidak ada!");
    return res.status(403).json({ success: false, message: "Token invalid" });
  }

  console.log("✅ Webhook diterima dan token valid!");
  console.log("📨 Payload:", JSON.stringify(req.body, null, 2));

  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
  console.log("🌍 URL aktif:", `https://socialbuzz-backend.onrender.com`);
});
