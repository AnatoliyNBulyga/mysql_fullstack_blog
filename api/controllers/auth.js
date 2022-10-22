import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthService from "../services/auth.js";


class AuthController {

    register(req, res) {

        try {
            const { email, username, password } = req.body;

            return AuthService.register({ email, username, password });

        } catch (err) {
            return res.json(err);
        }

    }

    login(req, res) {

        try {
            const { username, password } = req.body;

            const { secureUser, token } = AuthService.login({ username, password });

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(secureUser);

        } catch (err) {
            return res.json(err);
        }

    }

    logout(req ,res) {
        res.clearCookie("access_token", {
            sameSite: "none",
            secure: true
        }).status(200).json("User has been logged out.")
    }
}

export default new AuthController()