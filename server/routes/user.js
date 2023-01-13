import express from 'express'
import User from '../model/User.js'
import bcrypt from "bcrypt"
import {verifyTokenAndAuthorization} from './verifyToken.js';
const saltRounds = 10;


const router = express.Router()

// ----------------- GET -------------------------
//Get all users
router.get('/getAll', async (req, res) => {

    try {
        const users = await User.find()

        console.log(users)
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})


// Get user by id
router.get('/getById/:id', async (req, res) => {

    try {

        const findUser = await User.find({ _id: req.params.id })

        console.log(findUser)
        res.json(findUser)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})


// ----------------- POST -------------------------
// save new user
router.post('/register', async (req, res) => {

    try {
        const user = await User.find({ mail: req.body.mail })

        if (user[0]) {
            res.json("This mail already exist")
        } else {
            console.log("else")
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


router.post('/login', async (req, res) => {

    try {

        const user = await User.find({ mail: req.body.mail })

        if (user[0]) {
            bcrypt.compare(req.body.password, user[0].password, function (err, result) {  // Compare
                // if passwords match
                if (result) {
                    User.findOneAndUpdate(user[0]._id, { isLogin: true }, function (error, updatedUser) {

                        if (error) {
                            // handle error
                        } else {
                            let test = {
                                user: {
                                    id: updatedUser._id,
                                    date: new Date()
                                }
                            }
                            res.json(test)
                        }
                    });

                }
                // if passwords do not match
                else {
                    throw new Error("Invalid password!")
                }
            });
        } else {
            throw new Error("Invalid mail!")
        }


    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})


router.put('/changePassword', async (req, res) => {

    try {

        const user = await User.find({ _id: req.body._id })

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
                                    res.json(updatedUser)
                                }
                            });
                        });
                    });
                }
                // if passwords do not match
                else {
                    throw new Error("Invalid password!")
                }
            });
        } else {
            throw new Error("Invalid mail!")
        }


    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})



router.delete('/delete/:id', async (req, res) => {

    try {
        console.log(req.params.id)
        const deleteUser = await User.deleteOne({ _id: req.params.id })

        res.json(deleteUser)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})

router.put('/test/:id', verifyTokenAndAuthorization , async (req, res) => {
    try {
        
        const user = await User.findById({ _id: req.params.id })
        console.log(user)
        if (user) {
            bcrypt.compare(req.body.oldPassword, user.password, function (err, result) {  // Compare
                // if passwords match
                if (result) {

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.newPassword, salt, function (err, hash) {

                            User.findOneAndUpdate(user._id, { password: hash }, function (error, updatedUser) {

                                if (error) {
                                    // handle error
                                } else {
                                    res.json(updatedUser)
                                }
                            });
                        });
                    });
                }
                // if passwords do not match
                else {
                    throw new Error("Invalid password!")
                }
            });
        } else {
            throw new Error("Invalid mail!")
        }
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})
export default router

