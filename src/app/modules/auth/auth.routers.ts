import express, { NextFunction, Request, Response } from "express"
import { AuthControllers } from "./auth.controller"
import passport from "passport"

const router = express.Router()
router.post("/login", AuthControllers.loginWithEmailAndPassword)
router.post("/refresh-token", AuthControllers.getNewAccessToken)
router.post("/logout", AuthControllers.logout)
router.get("/google", async(req:Request, res:Response, next:NextFunction)=>{
    const redirect = req.params.redirect || "/"
    passport.authenticate("google",{scope:["profile","email"],state:redirect})(req,res,next)
})
router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login"}), AuthControllers.googleCallback)
export const AuthRouters = router