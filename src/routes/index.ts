import express from "express";
import userController from "../controllers/user";
import { UserTypes } from "../interfaces";
import authUserType from "../middlewares/authUserType";
import verifyToken from "../middlewares/verifyToken";
import claimsRouter from "./claims";
import employerRouter from "./employers";
import planYearsRouter from "./planYears";
import userRouter from "./users";

const router = express.Router();

router.post("/api/validate", verifyToken, userController.validateToken);
router.post("/api/login", userController.login);

router.use(
  "/api/users",
  verifyToken,
  authUserType([UserTypes.admin]),
  userRouter
);
router.use(
  "/api/employers",
  verifyToken,
  authUserType([UserTypes.admin]),
  employerRouter
);
router.use(
  "/api/claims",
  verifyToken,
  authUserType([UserTypes.admin]),
  claimsRouter
);
router.use(
  "/api/plans",
  verifyToken,
  authUserType([UserTypes.admin]),
  planYearsRouter
);

router.use(
  "/api/plans",
  verifyToken,
  authUserType([UserTypes.admin]),
  planYearsRouter
);

export default router;
