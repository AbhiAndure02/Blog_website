import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test = (req, res)=>{
    res.json({ message:"this is api working !!!"});
};

export const updateUser  = async (req, res, next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allow to upade this user'));
    }
    if(req.body.password){
    if(req.body.password.length<6){
        return next(errorHandler(400, 'password must be 6 letter'))
 
    }

    req.body.password = bcryptjs.hashSync(req.body.password, 10);
}
if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 20){
        return next(errorHandler(400, 'username must in between 7 to 20'))
    }
    if(req.body.username.includes(' ')){
        return next(errorHandler(400, 'username cannot contain space'))
    }
}

    try{
        const updateUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username : req.body.username,
                email : req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            }
        }, {new: true});
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);

    }catch(error){
        next(error)

    }
};

export const deleteUser = async (req, res, next) =>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allow to delete this user'));
    }try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("Account is delete")

    }catch(error){
        next(error)
    }
}
export const signout =async(req, res, next)=>{
    try {
        res.clearCookie('access_token').status(200).json('user has been sign out');
        
    } catch (error) {
        next(error)
        
    }

}