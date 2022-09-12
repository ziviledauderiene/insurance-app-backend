import express from "express";
import employerController from "../controllers/employer";
import controller from "../controllers/user";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/api/validate", controller.validateToken);
router.post("/api/register", controller.register);
router.post("/api/login", controller.login);
router.get("/api/users", verifyToken, controller.getAllUsers);
router.get("/api/employers", verifyToken, employerController.getEmployers);
router.post("/api/employers", verifyToken, employerController.createEmployer);

export default router;
