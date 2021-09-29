const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
exports.userSignup = async (req, res) => {
    const { firstName, lastName, userName, password, confirmPassword } = req.body
    if (!firstName || !lastName || !userName || !password || !confirmPassword) {
        return res.status(422).json({ error: "Please fill all the fields properly" })

    }
    try {
        const userLogin = await User.findOne({ userName: userName })

        if (userLogin) {
            return res.status(422).json({ error: "UserName already exist" })
        }
        else if (password != confirmPassword) {
            return res.status(422).json({ error: "Password entered does not match!" })
        }
        else {
            const user = new User({ firstName, lastName, userName, password, confirmPassword })
            await user.save();
            res.status(201).json({ message: "User has been registered successfully" })
        }


    } catch (err) {
        console.log(err)
    }


}

exports.userSignin = async (req, res) => {
    try {
        let token
        const { userName, password } = req.body
        if (!userName || !password) {
            return res.status(400).json({ error: "Please fill credentials" })
        }
        const userLogin = await User.findOne({ userName: userName })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            token = await userLogin.generateAuthToken();
            // console.log(token)
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now()+ 25892000000),
                httpOnly: true
            })

            if (isMatch) {
                return res.status(200).json({ message: "User logged in successfully", token })
            }
            else {
                return res.status(400).json({ error: "User not find either username or password does not match" })
            }
        }
        else {
            return res.status(400).json({ error: "user not found" })
        }

    }
    catch (err) {
        console.log(err)
    }
}

exports.userFollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            console.log(req.params)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { following: req.body.userId } })
                res.status(200).json("User has been followed")
            }
            else {
                res.status(403).json("You already follow this user")
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("You cannot follow yourself")
    }
}