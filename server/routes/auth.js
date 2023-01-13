import express from 'express'
import User from '../model/User.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {verifyToken} from './verifyToken.js';
import { serialize } from "cookie";


const saltRounds = 10;


const router = express.Router()

//REGISTER
router.post('/register', async (req, res) => {

    try {
        const user = await User.find({ mail: req.body.mail })
        
        if(!user[0] ){
            console.log("test")
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
    
                    const newUser = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        mail: req.body.mail,
                        address: req.body.address,
                        zip: req.body.zip,
                        password: hash
                    })

                    newUser.save()
                    res.json(newUser)
                });
            });
        }
        

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})

//LOGIN
router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ mail: req.body.mail })
        
        if(!user){
            res.status(401).json("Wrong mail");
        }else{
            bcrypt.compare(req.body.password, user.password, function (err, result) {  // Compare
                // if passwords match
                if (result) {
                    
                    const accessToken = jwt.sign(
                        {
                            id: user._id,
                            isAdmin: user.isAdmin,
                        },
                        process.env.JWT_SEC,
                            {expiresIn:"3d"}
                        );
                        
                        const { password, ...others } = user._doc; 
                        

                        const serialised = serialize("accessToken", accessToken, {
                            httpOnly: true,
                            secure: false,
                            maxAge: 60 * 60 * 24 * 3,
                            path: "/",
                          });

                          res.setHeader("Set-Cookie", serialised);

                        // res.cookie('accessToken', accessToken, { 
                        //     maxAge: 60 * 60 * 24 * 3,
                        //     secure: false, 
                        //     httpOnly:true  
                        // });

                        res.status(200).json({...others, accessToken});
                }
                // if passwords do not match
                else {
                    res.status(401).json("Wrong Password");
                }
            });

        }

        
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})

//cajdajow
router.post('/cookie', verifyToken,  async (req, res) => {

    try {
        // console.log("/cookie req.user ",req.user)
        res.status(200).json(req.user)
        // res.json("valid user xp")
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})

router.post('/cookieRemove', verifyToken, async (req, res) => {

    try {
        
        console.log("req.session",req.session)
        res.clearCookie("accessToken").json('cleared cookie');
        

        // res.status(200).json("removed")
        // res.json("valid user xp")
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})

export default router

