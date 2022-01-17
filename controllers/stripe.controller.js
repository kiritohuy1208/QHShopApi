const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.stripeController = (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      current: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) return res.status(500).json({ errors: stripeErr });
      if (stripeRes) return res.status(200).json(stripeRes);
    }
  );
};
