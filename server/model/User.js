import mongoose from "mongoose";
const { Schema, model } = mongoose


const userSchema = new Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        address: {type: String, require: true},
        mail: {type: String, required: true, unique: true},
        password: {type: String},
        isAdmin: {type: Boolean, default: false},
        
        },{timestamps: true}
)




const User = model("User", userSchema)
export default User;