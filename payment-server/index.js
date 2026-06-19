import express from "express";
import cors from "cors";
import "dotenv/config";
import { VNPay } from "vnpay";

const app = express();
app.use(cors());
app.use(express.json());

// PORT 4000 to match Checkout.js and avoid React's 3000
const PORT = process.env.PORT || 4000;

// Config VNPay
const vnpay = new VNPay({
    tmnCode: process.env.VNP_TMN_CODE || "YOUR_TMN_CODE",
    secureSecret: process.env.VNP_HASH_SECRET || "YOUR_HASH_SECRET",
    testMode: true,
});

app.get("/payment", (req, res) => {
    const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || "127.0.0.1";

    // Get amount and orderInfo from query
    const amount = req.query.amount ? parseInt(req.query.amount) : 100000;
    const orderInfo = req.query.orderInfo || "Thanh toan don hang";
    const returnUrl = req.query.returnUrl || `http://localhost:3000/checkout`;

    console.log("Received Payment Params - Amount:", amount, "ReturnURL:", returnUrl);

    // Build Payment URL
    const vnpUrl = vnpay.buildPaymentUrl({
        vnp_Amount: amount, // Amount in VND
        vnp_IpAddr: ipAddr,
        vnp_TxnRef: req.query.txnRef || Date.now(), // Transaction Reference (Order ID)
        vnp_OrderInfo: orderInfo,
        vnp_ReturnUrl: returnUrl, // URL to redirect after payment
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND'
    });

    console.log("✅ Payment URL generated:", vnpUrl);
    res.json({ url: vnpUrl });
});

// API verify return from VNPay
app.get("/vnpay-return", (req, res) => {
    const query = req.query;
    let verify;
    try {
        verify = vnpay.verifyReturnUrl(query);
    } catch (e) {
        verify = false;
        console.error("Verify Error:", e);
    }

    // Redirect to frontend with status
    // Frontend is typically at 3000
    if (verify.isVerified && verify.isSuccess) {
        res.redirect(`http://localhost:3000/checkout?vnp_ResponseCode=00&vnp_Amount=${query.vnp_Amount || 0}`);
    } else {
        res.redirect(`http://localhost:3000/checkout?vnp_ResponseCode=99`);
    }
});

app.listen(PORT, () => {
    console.log(`VNPay server running on http://localhost:${PORT}`);
});
