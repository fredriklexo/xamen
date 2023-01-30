import express from 'express'
import User from '../model/User.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {verifyToken} from './verifyToken.js';
import { serialize } from "cookie";
import * as dotenv from 'dotenv';

const saltRounds = dotenv.config().parsed.SALT_KEY


const router = express.Router()


router.post('/changePassword', verifyToken,  async (req, res) => {

    try {
       
        const user = await User.find({ _id: req.user.id })

        if (user[0]) {
            bcrypt.compare(req.body.oldPassword, user[0].password, function (err, result) {  // Compare
                // if passwords match
                if (result) {

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.newPassword, salt, function (err, hash) {

                            User.findOneAndUpdate(user[0]._id, { password: hash }, function (error, updatedUser) {

                                if (error) {
                                    // handle error
                                } else {
                                    
                                    res.status(200).json({ message: "Your password is now change!", status: "success", data: updatedUser})
                                }
                            });
                        });
                    });
                }
                // if passwords do not match
                else {
                    res.status(400).json({ message: "your password was entered incorrectly. please enter it again", status: "fail" })
                }
            });
        } else {
            res.status(400).json({ message: "something went wrong!", status: "fail" })
        }


    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})




router.post('/cookieRemove', verifyToken, async (req, res) => {

    try {
        
       
        res.clearCookie("accessToken").json('cleared cookie');
        
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})


router.get('/cookie/verifyTooken', verifyToken, async (req, res) => {

    try {
        
        const findUser = await User.findById( req.user.id )
        if(findUser){
            const {password, ...other} = findUser._doc
           
            res.status(200).json({ data: other , status: "success" })
        }else{
            res.status(404).json({ message: "user not found!" })
        }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})

router.get('/getUser/details', verifyToken, async (req, res) => {

    try {
        
        const findUser = await User.findById( req.user.id )
        if(findUser){
            const {password, ...other} = findUser._doc
           
            res.status(200).json({ data: other , status: "success" })
        }else{
            res.status(404).json({ message: "user not found!" })
        }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})
router.post('/updateUser/details', verifyToken, async (req, res) => {

    try {
       
        const currentUserInfo = await User.findById( req.user.id )
        const checkIfUserExsist = await User.find( {mail: req.body.mail} )
        console.log(currentUserInfo.firstName != req.body.firstName)

        if(checkIfUserExsist[0] === undefined){
            console.log("currentUserInfo.mail", currentUserInfo.mail)
            currentUserInfo.mail = req.body.mail
            console.log("currentUserInfo.mail = req.body.mail", currentUserInfo.mail)
        }
        if(currentUserInfo.firstName != req.body.firstName){
            console.log("currentUserInfo.firstName",currentUserInfo.firstName)
            currentUserInfo.firstName = req.body.firstName
            console.log(" currentUserInfo.firstName = req.body.firstName",currentUserInfo.firstName)
        }
        if(currentUserInfo.lastName != req.body.lastName){
            console.log(" currentUserInfo.lastName",currentUserInfo.lastName)
            currentUserInfo.lastName = req.body.lastName
            console.log(" currentUserInfo.lastName = req.body.lastName",currentUserInfo.lastName)
        }
        if(currentUserInfo.mail === req.body.mail){
            
            console.log("currentUserInfo",currentUserInfo)
            currentUserInfo.save()
            const {password, ...other} = currentUserInfo._doc
            res.status(200).json({ data: other , status: "success", message: "Your profile has been updated." })
        }else{
            res.status(404).json({ message: "user not found!" })
        }
        




        // if(currentUserInfo.mail === checkIfUserExsist[0].mail && currentUserInfo._id === !checkIfUserExsist[0]._id ){
        //     res.status(404).json({  message: "user not found!" ,data: false , status: "fail" })
        // }else if(currentUserInfo){
        //     let updatedUser = await User.findByIdAndUpdate(req.user.id,{mail: req.body.mail, firstName: req.body.firstName, lastName: req.body.lastName})
        //     const {password, ...other} = updatedUser._doc
           
        //     res.status(200).json({ data: other , status: "success" })
        // }else{
        //     res.status(404).json({ message: "user not found!" })
        // }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})

export default router

