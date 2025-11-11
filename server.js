import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Konfigurasi
const PORT = process.env.PORT || 10000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "sbwhook-lix9tqznbsgkol0dvm4o3r6e";

// Route tes
app.get("/", (req, res) => {
  res.send("✅ Webhook SocialBuzz aktif dan berjalan!");
});

// Webhook utama
app.post("/webhook/socialbuzz", (req, res) => {
  try {
    // Tangkap token dari berbagai kemungkinan lokasi
    const headerToken =
      req.headers["x-webhook-token"] ||
      req.headers["authorization"] ||
      req.headers["webhook-token"];
    const bodyToken =
      req.body?.webhook_token ||
      req.body?.token ||
      req.query?.token;

    const token = headerToken || bodyToken;

    // Debug log agar kita tahu token dari SocialBuzz
    console.log("📦 HEADER:", req.headers);
    console.log("📦 BODY:", req.body);
    console.log("📦 Token diterima:", token);

    // Verifikasi token
    if (!token || token !== WEBHOOK_SECRET) {
      console.log("❌ Token salah atau tidak ada:", token);
      return res.status(403).json({ success: false, message: "Token invalid" });
    }

    // Jika valid
    console.log("✅ Webhook diterima dan token valid!");
    console.log(JSON.stringify(req.body, null, 2));

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("🔥 Error webhook:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
