import express from "express"
import { authToken } from "../middlewares/authTokenMiddleware";
import { isAdmin } from "../middlewares/authUserMiddleware";
const router = express.Router();

router.use(isAdmin)

router.get("/dashboard", authToken, (req: any,res: any) => {
    res.render("admin/dashboard")
})
router.get("/admin", authToken, (req,res) => {
    res.render("admin/admin");
})


module.exports = router;