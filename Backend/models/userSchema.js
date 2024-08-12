import { mongoose } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 2 characters."],
    maxLength: [30, "Name cannot exceed 30 characters."],
  },
  email: {
    type: String,
    required: true, //which we definatly required we will keep it true.
    validate: [validator.isEmail, "Please provide valid email."],
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  niches: {
    firstNiche: String,
    secondNiche: String,
    thirdNiche: String,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain at least 8 characters."],
    maxLength: [32, "Password cannot exceed 32 characters."],
    Select: false,  //from this no one can access the password
  },
  resume: {
    public_id: String,
    url: String,
  },
  coverLetter: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["Job Seeker", "Employer"], //here we are giving only two option, not too much.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Just let us consider that you want to do some changes or updation before the user registration then for this purpose we use the " pre ".
//here we are bcrypt the password of user to keep the password more secure.
userSchema.pre("save", async function(next) {
        if(!this.isModified("password"))
        {
            next();
        }
        this.password = bcrypt.hash(this.password, 10);
});
 
// now after encryption user wants that thier password will show as it is as he or she was written. so for it we have to create the function which compare the enteredPassowrd and the decrypted password.
 
 
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}; 
 
 
//sign fuction generates the token and always try to give the unique payload string to generate the different token as much as you can.

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
