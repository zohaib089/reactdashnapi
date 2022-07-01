import express from "express";
import {updateUser,deleteUser,getUser,getUsers} from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


// router.get("/checkauth",verifyToken,(req,res,next)=>{
//     res.send('Hello user u r authenticated');
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send('Hello user u r loged in and can delete your account');
// })
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send('Hello admin');
// })
//UPDATE
router.put('/:id',verifyUser, updateUser)
//DELETE
router.delete('/:id',verifyUser,deleteUser)
//GET
router.get('/:id',verifyUser,getUser)
//GET ALL
router.get('/',verifyUser,getUsers)

export default router;