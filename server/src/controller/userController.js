const bcrypt = require('bcrypt');
const prisma = require('../prisma');
const jwt = require('jsonwebtoken');

const authController = {
    signup: async (req, res) => {
        try {
            const { email, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword
                }
            })
            res.status(200).json({ user })
        } catch (error) {
            res.status(500).json({ "Internal server error": error })
            console.log(error)
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (!user) return res.status(400).json({ msg: "Invalid credentials" })
            if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({ msg: "Invalid credentials" })


            const payload = {
                email: email,
                id: user.id
            }

            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })

            res.status(200).json({ "Message": "Successfull login ", user, "token": "Bearer " + token })

        } catch (error) {
            res.status(500).json({ "Internal server error": error })
            console.log(error)
        }
    },

    getUser: async(req, res) =>{
        try {
            const user = await prisma.user.findUnique({
                where:{
                    id:req.user.id
                }
            });
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({ "Internal server error": error })
            console.log(error)
        }
    },
}

module.exports = authController;