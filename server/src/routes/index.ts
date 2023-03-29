import { Router } from "express";
import { ensureAuthenticate } from "../shared/infra/http/middlewares/ensureAuthenticate";

const router = Router();

import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { passwordRoutes } from "./password.routes";
import { messagesRoutes } from "./messages.routes";

router.use('/auth', authenticateRoutes)
router.use("/password", passwordRoutes);
router.use("/users", ensureAuthenticate, usersRoutes);
router.use("/", ensureAuthenticate, messagesRoutes);


export { router };