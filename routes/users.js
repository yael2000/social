/**
    * @description      : 
    * @author           : yaelm
    * @group            : 
    * @created          : 10/08/2021 - 22:11:35
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/08/2021
    * - Author          : yaelm
    * - Modification    : 
**/

const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put('/:id', async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.getSalt(10)
                req.body.password = await bcrypt.hash(req.body.password.password, salt)
            }
            catch (err) {
                return res.status(403).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("Account has been updeted!")
        }
        catch (err) {
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("you can update only your account!")
    }

})
//delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted!")
        }
        catch (err) {
            res.status(500).json(err)
        }
    } else {
        return res.status(403).json("you can delete only your account!")
    }

})
//get a user

router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username })
        const { password, updateAt, ...other } = user._doc
        res.status(200).json(other)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get user by id
// router.get("/:id", async (req, res) => {
//     const userId = req.params.id
//     try {
//         const user = await User.findById(userId)
//         res.status(200).json(user)
//     }
//     catch (err) {
//         res.status(500).json(err)
//     }
// })

//get all friends
// router.get("/getAll", async (req, res) => {
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
//        // const users = await User.find({})
//         //res.status(200).json(users)
//     }
//     catch (err) {
//         res.status(500).json(err)
//     }
// })

router.get("/getAll", async (req, res) => {
    // console.log("user-------", user)
    try {

        const user = await User.find()

        res.status(200).json(user)

    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {

                return User.findById(friendId)

            })
        )
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend
            friendList.push({
                _id, username, profilePicture
            })
        })
        res.status(200).json(friendList)
    }
    catch (err) {
        res.status(500).json(err)
    }
})



//follow a user

router.put("/:id/follow", async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json("user has been followed")
            }
            else {
                res.status(403).json("you already follow this user")
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("you can't follow yourself!")
    }
})
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json("user has been unfollowed")
            }
            else {
                res.status(403).json("you dont follow this user")
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("you can't unfollow yourself!")
    }
})

module.exports = router;
