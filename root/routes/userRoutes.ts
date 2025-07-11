import express from "express"
import { authToken } from "../middlewares/authTokenMiddleware";
import { isUser } from "../middlewares/authUserMiddleware";
const router = express.Router();

router.use(isUser);

router.get("/dashboard", authToken, (req: any,res: any) => {
    res.render("user/dashboard")
})


export default router;