const Score = require("../models/scoreModel");
const mongoose = require("mongoose");

//get all scores
const getScores = async (req, res) => {
    const user_id = req.user._id;
    const scores = await Score.find({user_id}).sort({createdAt: -1})

    res.status(200).json(scores);
}

// getting single score not needed

const createScore = async (req, res) => {
    const {speed, accuracy} = req.body;

    try{
        const user_id = req.user._id;
        const score = await Score.create({speed, accuracy, user_id})
        res.status(200).json(score);

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

const deleteScore = async (req, res) => {
    const {id} = req.params//to get ids from link

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Not a valid Id"})
    }

    const score = await Workout.findOneAndDelete({_id: id});

    if(!score){
        return res.status(400).json({error: "No record found with the ID"});
    }

    res.status(200).json(score);
}

//update not required

module.exports={
    getScores,
    createScore,
    deleteScore
}