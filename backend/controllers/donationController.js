import donationModel from "../models/donationModel.js";
import Stripe from "stripe";

//global variables
const currency = "inr";

//gateway initialise
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//making payment using stripe method
const donateStripe = async (req, res) => {
  try {
    const { userId, donor, grossPayment, schemeName } = req.body;
    const { origin } = req.headers;

    const paymentData = {
      userId,
      donor,
      schemeName,
      grossPayment,
      payment: false,
      date: Date.now(),
    };

    const newPayment = new donationModel(paymentData);
    await newPayment.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: schemeName,
            },
            unit_amount: Math.round(grossPayment * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/verify?success=true&paymentId=${newPayment._id}`,
      cancel_url: `${origin}/verify?success=false&paymentId=${newPayment._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//verify stripe
const verifyStripe = async (req, res) => {
  try {
    const { success, paymentId } = req.body;

    if (!success || success !== "true") {
      return res.json({
        success: false,
        message: "Payment was not successful.",
      });
    }

    const payment = await donationModel.findById(paymentId);
    if (!payment) {
      return res.json({ success: false, message: "Payment record not found." });
    }

    if (payment.payment === true) {
      return res.json({ success: true, message: "Payment already verified." });
    }

    payment.payment = true;
    await payment.save();

    res.json({ success: true, message: "Payment verified successfully." });
  } catch (error) {
    console.log("Verification error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//all payments data for admin panel
const allPayments = async (req, res) => {
  try {
    const donations = await donationModel.find({});
    res.json({ success: true, donations });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//payment data for frontend
const userPayments = async (req, res) => {
  console.log("UserPayments controller called");

  try {
    const userId = req.body.userId;
    console.log("userPayments called with userId:", userId);

    const donations = await donationModel.find({ userId });
    console.log(donations);
    res.json({
      success: true,
      donations,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { verifyStripe, donateStripe, allPayments, userPayments };
