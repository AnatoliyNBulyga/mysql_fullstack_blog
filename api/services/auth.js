import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class AuthService {

    register({ email, username, password }) {
        // CHECK EXISTING USER
        const q = "SELECT * FROM users WHERE email = ? OR username = ?";
        db.query(q, [email, username], (err, data) => {
            if (err) {
                console.log('err in register ', err);
                throw new Error('Bad request')
            }
            if (data.length) {
                throw new Error('User already exists!')
            }

            // Hash the password and creat a user
            const salt = bcrypt.genSaltSync(8);
            const hash = bcrypt.hashSync(password, salt);

            const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
            const values = [
                username,
                email,
                hash
            ];
            db.query(q, [values], (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json("User has been created.");
            })
        });
    }

    login({ username, password }) {

        let result = {};

        // CHECK USER
        const q = "SELECT * FROM users WHERE username = ?";

        db.query(q, [username], (err, data) => {
            if (err) {
                console.log('err in login ', err);
                throw new Error('Bad request');
            }
            if (!data.length) {
                throw new Error('User not found!');
            }

            // CHECK PASSWORD
            const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);

            if(!isPasswordCorrect) {
                throw new Error('Wrong username or password!')
            };

            const token = jwt.sign({id: data[0].id}, "jwtSecrete");
            const { password, ...restData } = data[0];

            result = {
                secureUser: restData,
                token
            };

        });

        return result;
    }
}

export default new AuthService()