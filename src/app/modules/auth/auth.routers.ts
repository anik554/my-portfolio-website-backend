import express from "express"
import { AuthControllers } from "./auth.controller"

const router = express.Router()
router.post("/login", AuthControllers.loginWithEmailAndPassword)
router.post("/refresh-token", AuthControllers.getNewAccessToken)
router.post("/logout", AuthControllers.logout)
router.post("/google", AuthControllers.googleLogin)
export const AuthRouters = router