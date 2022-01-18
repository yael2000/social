/**
    * @description      : 
    * @author           : yaelm
    * @group            : 
    * @created          : 15/08/2021 - 01:13:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2021
    * - Author          : yaelm
    * - Modification    : 
**/
const router = require("express").Router();
const Ad = require("../models/Ad")
const User = require("../models/User");

// create an ad

router.post("/", async (req, res) => {
    const newAd = new Ad(req.body)
    try {
        const saveAd = await newAd.save()
        res.status(200).json(saveAd);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// update an ad

router.put("/:id", async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id)
        if (ad.userId === req.body.userId) {
            await ad.updateOne({ $set: req.body })
            res.status(200).json("the ad has been updated")
        }
        else {
            res.status(403).json("you can update only your ads")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// delete an ad
router.delete("/:id", async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id)

        if (ad.userId === req.body.userId) {
            await ad.deleteOne()
            res.status(200).json("the ad has been deleted")
        }
        else {
            res.status(403).json("you can delete only your ads")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})


// get an ad

router.get('/:id', async (req, res) => {
    try {
        const ad = await Ad.findById(req.params.id)
        res.status(200).json(ad)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

// get user's all ads


router.get("/getAll/:username", async (req, res) => {
    try {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+req.params.username)
        const user = await User.findOne({ username: req.params.username })
        const ads = await Ad.find({ userId: user._id })
        res.status(200).json(ads)
    }
    catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;