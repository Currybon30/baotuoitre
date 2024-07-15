import User from "../models/user.model.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res) => {
    try{
        const user = await User.create(req.body);
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });  
    }
}

const listAll = async (req, res) => {
    try{
        let users = await User.find();
        return res.json(users);
    }
    catch (err){
        return res.status('400').json({
            error: "Could not retrieve users"
        });
    }
}

export default {
    create,
    listAll
}