import express from 'express'
import User from '../model/User.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {verifyToken, verifyTokenAndAuthorization} from './verifyToken.js';
import { serialize } from "cookie";
import * as dotenv from 'dotenv';
const saltRounds = parseInt(dotenv.config().parsed.SALT_KEY)


const router = express.Router()


//REGISTER
router.post('/register', async (req, res) => {

    try {
        
        const user = await User.find({ mail: req.body.mail })
       
        if(!user[0] ){
            
            bcrypt.genSalt(saltRounds, function (err, salt) {
                
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                   
                    const newUser = new User({
                    

                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        address: req.body.address,
                        mail: req.body.mail,
                        password: hash,
                        zip: req.body.zip,
                    })
                    
                    newUser.save()

                    bcrypt.compare(req.body.password, newUser.password, function (err, result) {  // Compare
                        // if passwords match
                        if (result) {
                            
                            const accessToken = jwt.sign(
                                {
                                    id: newUser._id,
                                    isAdmin: newUser.isAdmin,
                                },
                                process.env.JWT_SEC,
                                    {expiresIn:"3d"}
                                );
                                
                                const { password, ...others } = newUser._doc; 
                                
        
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
                });
            });
        }else{
            res.status(400).json("Det här suger");
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



export default router

