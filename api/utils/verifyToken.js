import jwt from 'jsonwebtoken';
import {createError} from './error.js'

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401,'you are not authenticated'))
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if (err) return next(createError(403,"Invalid Token"));
        req.user = user;     
        next();
    });
}



export const verifyUser = (req,res,next)=>{
    verifyToken(req,res, ()=>{
    if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }else{
        return next(createError(401,'you are not authenticated'))
        }
    })
}


export const verifyAdmin = (req,res,next)=>{
    console.log('entered')
    verifyToken(req,res, ()=>{
    if (req.user.isAdmin === true) {
            next()
        }else{
        return next(createError(401,'you are not admin'))
        }
    })
}