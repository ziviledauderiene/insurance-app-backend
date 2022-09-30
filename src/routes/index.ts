import express from "express";
import userController from "../controllers/user";
import { UserTypes } from "../interfaces";
import authUserType from "../middlewares/authUserType";
import verifyToken from "../middlewares/verifyToken";
import claimsRouter from "./claims";
import employerRouter from "./employers";
import userRouter from "./users";

const router = express.Router();

router.post("/api/validate", verifyToken, userController.validateToken);
router.post("/api/login", userController.login);

router.use(
  "/api/users",
  verifyToken,
  authUserType([UserTypes.ADMIN]),
  userRouter
);
router.use(
  "/api/employers",
  verifyToken,
  authUserType([UserTypes.ADMIN]),
  employerRouter
);
router.use(
  "/api/claims",
  verifyToken,
  authUserType([UserTypes.ADMIN]),
  claimsRouter
);

export default router;
