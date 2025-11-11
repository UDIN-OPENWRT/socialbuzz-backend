import express from "express";
const app = express();
app.use(express.json());

let lastDonation = { username: null, amount: 0, message: "" };

app.post("/webhook/socialbuzz", (req, res) => {
  console.log("💖 New donation:", req.body);
  lastDonation = req.body;
  res.json({ success: true });
});

app.get("/data", (req, res) => {
  res.json(lastDonation);
});

app.listen(3000, () => console.log("✅ Webhook server running"));
