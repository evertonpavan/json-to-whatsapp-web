import { Router } from "express";
import { CreateUserController } from "../modules/accounts/use-cases/create-user/create-user-controller";
import { ProfileUserController } from "../modules/accounts/use-cases/profile-user/profile-user-controller";


const usersRoutes = Router();

const profileUserController = new ProfileUserController();

usersRoutes.get("/profile", profileUserController.handle);


export { usersRoutes };
