const Arena = require('../models/arenaModel')

const requireArena = async (req, res, next) => {
    try{
        const {arena_id} = req.body.arena_id;
        var _ = await Arena.findOne({arena_id}).select('arena_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Arena not found !'})
    }
}

module.exports = requireArena;