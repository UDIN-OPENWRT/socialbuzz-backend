// ==============================
// 🌐 SocialBuzz Webhook Backend (Render / Node.js)
// ==============================

import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// ===== Konfigurasi =====
const PORT = process.env.PORT || 10000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "sbwhook-lix9tqznbsgkol0dvm4o3r6e"; // ganti sesuai token SocialBuzz kamu

// ===== Route tes =====
app.get("/", (req, res) => {
  res.send("✅ Webhook SocialBuzz aktif dan berjalan!");
});

// ===== Route webhook utama =====
app.post("/webhook/socialbuzz", (req, res) => {
  try {
    // Bisa token dari header atau body
    const headerToken = req.headers["x-webhook-token"];
    const bodyToken = req.body.webhook_token;
    const token = headerToken || bodyToken;

    // Verifikasi token
    if (!token || token !== WEBHOOK_SECRET) {
      console.log("❌ Token salah atau tidak ada:", token);
      return res.status(403).json({ success: false, message: "Token invalid" });
    }

    // Jika valid, tampilkan data dari SocialBuzz
    console.log("📩 Webhook diterima dari SocialBuzz:");
    console.log(JSON.stringify(req.body, null, 2));

    // Kirim respon sukses ke SocialBuzz
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("🔥 Error webhook:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===== Jalankan server =====
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
