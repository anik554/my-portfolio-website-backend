import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/envVars";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =(...authRoles: string[])=> async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const accessToken = req.headers.authorization
        if(!accessToken){
            throw new AppError(httpStatus.FORBIDDEN,"No Token Received")
        }
        const verifiedToken = verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload
        if(!authRoles.includes(verifiedToken.role)){
            throw new AppError(httpStatus.FORBIDDEN,"You are not permitted to view this route!!!")
        }
        next()
    } catch (error) {
        console.error("jwt error",error)
        next(error)
    }
}