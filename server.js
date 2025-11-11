import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;
const WEBHOOK_SECRET = "sbwhook-lix9tqznbsgkol0dvm4o3r6e"; // Token kamu dari SocialBuzz

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root untuk cek server
app.get("/", (req, res) => {
  res.send("✅ SocialBuzz Webhook Backend Aktif & Siap Menerima!");
});

// Webhook utama
app.post("/webhook/socialbuzz", (req, res) => {
  // Coba ambil token dari semua kemungkinan lokasi
  const headerToken = req.headers["x-webhook-token"];
  const authHeader = req.headers["authorization"];
  const bodyToken = req.body?.token || req.body?.webhook_token;
  const queryToken = req.query?.token;

  const token = headerToken || authHeader || bodyToken || queryToken;

  console.log("========== 🔍 DEBUG TOKEN ==========");
  console.log("Header:", req.headers);
  console.log("Body:", req.body);
  console.log("Query:", req.query);
  console.log("Token diterima:", token);
  console.log("====================================");

  // Verifikasi token
  if (!token || token.trim() !== WEBHOOK_SECRET.trim()) {
    console.log("❌ TOKEN SALAH ATAU TIDAK ADA");
    return res.status(403).json({
      success: false,
      message: "Token invalid",
      received: token,
      expected: WEBHOOK_SECRET,
    });
  }

  console.log("✅ TOKEN VALID!");
  console.log("📨 PAYLOAD:", JSON.stringify(req.body, null, 2));

  res.status(200).json({
    success: true,
    message: "Webhook received successfully",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
  console.log("🌍 URL aktif: https://socialbuzz-backend.onrender.com");
});
