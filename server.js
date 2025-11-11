import express from "express";
const app = express();
app.use(express.json());

// Simpan data donasi terakhir di memori sementara
let lastDonation = {
  username: "Belum Ada",
  amount: 0,
  message: "Menunggu donasi pertama..."
};

// ✅ Endpoint SocialBuzz Webhook (POST)
app.post("/webhook/socialbuzz", (req, res) => {
  const body = req.body;

  console.log("Webhook diterima:", body);

  // Simpan data ke variabel sementara
  if (body.username && body.amount) {
    lastDonation = {
      username: body.username,
      amount: Number(body.amount) || 0,
      message: body.message || "Tanpa pesan"
    };
  }

  res.json({ success: true });
});

// ✅ Endpoint untuk Roblox (GET)
app.get("/webhook/socialbuzz", (req, res) => {
  res.json(lastDonation);
});

app.listen(3000, () => console.log("✅ Webhook aktif di port 3000"));
