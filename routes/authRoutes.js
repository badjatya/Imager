import express from "express";

import User from "../mongodb/models/user.js";
import customError from "../utils/customError.js";
const router = express.Router();

router.route("/signup").post(async (req, res) => {
    const { name, email, password } = req.body;

    // Checking all the fields are present
    if (!name || !email || !password) {
        return customError(res, 400, "Name, email and password are required");
    }

    try {
        // Checking user already exist or not
        const isUserExit = await User.findOne({ email });
        if (isUserExit !== null) {
            return customError(res, 401, "User already exists, please login");
        }

        // Creating new user
        const user = await User.create({
            name,
            email,
            password,
        });

        res.json({
            status: "success",
            success: true,
            message: "Account Created!",
        });
    } catch (error) {
        customError(res, 500, error.message, "error");
    }
});

router.route("/login").post(async (req, res) => {
    const { email, password } = req.body;

    // Checking all the fields are present
    if (!email || !password) {
        return customError(res, 400, "Email and password are required");
    }

    try {
        const user = await User.findOne({ email });

        // Checking is valid email
        if (!user) {
            return customError(
                res,
                401,
                "Either email or password is incorrect"
            );
        }

        const isPasswordMatch = await user.isValidPassword(password);
        if (!isPasswordMatch) {
            return customError(
                res,
                401,
                "Either email or password is incorrect"
            );
        }

        // Valid user, creating jwt token valid for 2days
        const token = await user.getJwtLoginToken();

        // Sending a cookie valid for 2days
        res.cookie("token", token, {
            expire: new Date(
                Date.now() * process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        });

        // Sending response
        res.json({
            status: "success",
            success: true,
            token,
            user,
        });
    } catch (error) {
        customError(res, 500, error.message, "error");
    }
});

export default router;
