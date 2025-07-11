import express from "express"
import { login, logout } from "../Controllers/loginController"
const router = express.Router();

router.get("/login", (req: any,res: any) => {
    res.render("login")
})
router.post("/login", login);

router.get("/logout", logout)


export default router;