import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generateJWT } from '../helpers/generateJWT.js';

export const register = async (req, res) => {
    try {
        const { userName, name, email, password } = req.body;

        const salt = bcryptjs.genSaltSync();
        const encryptedPassword = bcryptjs.hashSync(password, salt);

        const user = await User.create({
            userName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            name,
        });

        return res.status(200).json({
            msg: "user has been added to database",
            userDetails: {
                user: user.userName,
                email: user.email,
            },
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send("User cannot be added to database");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //verificar si el email existe:
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await bcryptjs.compare(password, user.password))) {
            const token = await generateJWT(user.id, user.email)

            res.status(200).json({
                msg: "Login Ok!!!",
                userDetails: {
                    username: user.username,
                    token: token
                },
            });
        }

        if (!user) {
            return res
                .status(400)
                .send(`Wrong credentials, ${email} doesn't exists on database`);
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).send("wrong password");
        }
    } catch (error) {
        res.status(500).send("Something went wrong on the server");
    }
};