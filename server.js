// const express = require("express");
// const Razorpay = require("razorpay");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🔍 Confirm env variables
// console.log("KEY_ID:", process.env.KEY_ID);
// console.log("KEY_SECRET:", process.env.KEY_SECRET ? "LOADED" : "MISSING");

// // ❌ Stop server if keys are missing
// if (!process.env.KEY_ID || !process.env.KEY_SECRET) {
//     console.error("❌ Razorpay keys missing. Check .env file.");
//     process.exit(1);
// }

// // Razorpay instance
// const razorpay = new Razorpay({
//     key_id: process.env.KEY_ID,
//     key_secret: process.env.KEY_SECRET,
// });

// // Test route
// app.get("/", (req, res) => {
//     res.send("Backend running successfully");
// });

// // ✅ Create order route
// app.post("/create-order", async (req, res) => {
//     try {
//         const { amount } = req.body;

//         console.log("Incoming amount:", amount);

//         if (!amount || isNaN(amount)) {
//             return res.status(400).json({ message: "Invalid amount" });
//         }

//         const order = await razorpay.orders.create({
//             amount: amount * 100, // rupees → paise
//             currency: "INR",
//             receipt: "receipt_" + Date.now(),
//         });

//         console.log("✅ Order created:", order);

//         res.status(200).json(order);
//     } catch (error) {
//         console.error("🔥 RAZORPAY ERROR FULL OBJECT 🔥");

//         // Razorpay error details
//         if (error.error) {
//             console.error("Code:", error.error.code);
//             console.error("Description:", error.error.description);
//             console.error("Source:", error.error.source);
//             console.error("Step:", error.error.step);
//             console.error("Reason:", error.error.reason);
//         } else {
//             console.error(error);
//         }

//         res.status(500).json({
//             message: "Order creation failed",
//             razorpayError: error.error || error.message,
//         });
//     }

// });

// app.listen(5000, () => {
//     console.log("🚀 Backend running on http://localhost:5000");
// });




const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("KEY_ID:", process.env.KEY_ID);
console.log("KEY_SECRET:", process.env.KEY_SECRET ? "LOADED" : "MISSING");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// ✅ Create Order API
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (error) {
    console.error("🔥 Razorpay Error:", error);

    res.status(500).json({
      message: "Order creation failed",
      razorpayError: error?.error,
    });
  }
});

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
