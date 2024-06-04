import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import config from './../config/config.js';

const signin = async (req, res) => {
    try {
        // Find the user by username
        const user = await User.findOne({ username: req.body.username });
        
        // Check if user exists
        if (!user)
            return res.status(401).json({ error: "User not found" });
        
        // Check if password is correct
        const isPasswordValid = await user.authenticate(req.body.password);
        if (!isPasswordValid)
            return res.status(401).json({ error: "Email and password don't match." });

        // Generate token
        const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '12h' });

        // Set token in cookie
        res.cookie("t", token, { expire: new Date(Date.now() + 12 * 60 * 60 * 1000) });

        // Send token and user details in response
        return res.json({
            token,
            user: { _id: user._id, username: user.username }
        });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Could not sign in" });
    }
}

const signout = (req, res) => {
    // Clear token cookie
    res.clearCookie("t");
    // Send signout message
    return res.status(200).json({ message: "Signed out" });
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth'
});

const hasAuthorization = (req, res, next) => {
    // Check if user is authorized
    const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
    if (!authorized) {
        return res.status(403).json({ error: "User is not authorized" });
    }
    next();
}

export default { signin, signout, requireSignin, hasAuthorization };
