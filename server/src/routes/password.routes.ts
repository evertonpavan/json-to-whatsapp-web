import { Router } from "express";
import { ChangePasswordUserController } from "../modules/accounts/use-cases/change-password-user/change-password-user-controller";
import { ResetPasswordUserController } from "../modules/accounts/use-cases/reset-password-user/reset-password-user-controller";
import { ensureAuthenticate } from "../shared/infra/http/middlewares/ensureAuthenticate";


const passwordRoutes = Router();

const resetPasswordUserController = new ResetPasswordUserController;
const changePasswordUserController = new ChangePasswordUserController;

// TO DO:
// const sendForgotPasswordMailController = new SendForgotPasswordMailController();
// passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);

passwordRoutes.post("/reset", resetPasswordUserController.handle);
passwordRoutes.post("/change", ensureAuthenticate, changePasswordUserController.handle);


export { passwordRoutes };
