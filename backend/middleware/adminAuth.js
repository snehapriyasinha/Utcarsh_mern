import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(token);
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorised, Login again!",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token_decode);
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not authorised, Login again!",
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: e.message,
    });
  }
};

export default adminAuth;
