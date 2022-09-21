import express from "express";
import userController from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/", userController.register);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.patch("/:id", userController.updateUser);

export default userRouter;
