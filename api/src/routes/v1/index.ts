import express from "express";
import auth from "../../middlewares/auth";
import authRouter from "./auth";
import adminRouter from "./admin";
import userRouter from "./user";
import homeRouter from './home/homeRoutes'

const app = express();

app.use("/auth", authRouter);

app.use("/admin", auth.verifyToken, auth.hasRole(["admin"]), adminRouter);

app.use("/user", auth.verifyToken,  userRouter);

app.use("/home",homeRouter);

// Logout

app.get("/logout", async (req, res) => {
  try {
    const userToken =
      req.headers.authorization &&
      req.headers.authorization.split("Bearer ")[1];

    console.log("userToken", userToken);
    if (!userToken) {
      res.send({
        ok: true,
        message: "No user token. User already logged out.",
      });
      // throw "Token should be Bearer token";
      return;
    }

    return res.status(401).send({ status: true, message: "Logging user out." });
  } catch (error) {
    if (
      error.name == "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      res.status(401).send({ ok: true, message: "Logging user out." });
      return;
    }
    console.error(error);
    res.status(400).send({
      ok: false,
      message: "Error Logging Out",
    });
  }
});

export default app;
