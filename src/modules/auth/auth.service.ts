import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db"

const loginWithEmailAndPassword = async({email,password}:{email:string,password:string})=>{
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        throw new Error("User not found!!")
    }
    if(password !== user.password){
        throw new Error("Password is incorrect!!")
    }else{
        return user
    }
}

const googleLogin = async(data:Prisma.UserCreateInput):Promise<Partial<User>>=>{
    let user = await prisma.user.findUnique({
        where:{
            email: data.email
        }
    })

    if(!user){
        user = await prisma.user.create({
            data
        })
    }
    return user
}

export const AuthServices = {
    loginWithEmailAndPassword,
    googleLogin
}