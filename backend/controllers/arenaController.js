const Arena = require("../models/arenaModel");
const nanoid = require("nanoid-esm");

const joinArena = async (req, res) => {
    try {
        const { nickname, arena_id } = req.body;
        const valid_arena = await Arena.findOne({ arena_id }).select('arena_id owner_id owner_name');

        if (!valid_arena) {
            throw Error("Arena not found");
        }

        const arena = {
            "arena_id": valid_arena["arena_id"], 
            "owner_id": valid_arena['owner_id'], 
            "owner_name": valid_arena['owner_name']
        };

        const temp_id = nanoid(10);
        res.status(200).json({ nickname, temp_id, ...arena });

    } catch (err) {
        console.log(err);
        res.status(401).json({ error: err.message})
    }

}

// use random ids for arena id and temp id
const createArena = async (req, res) => {
    try {
        const { nickname } = req.body;
        const temp_id = nanoid(10);
        const arena_id = nanoid(5);

        const valid_arena = await Arena.create({ arena_id: arena_id, owner_id: temp_id, owner_name: nickname });
        
        if (!valid_arena) {
            throw Error("Unable to create Arena");
        }

        const arena = {
            "arena_id": valid_arena["arena_id"], 
            "owner_id": valid_arena['owner_id'], 
            "owner_name": valid_arena['owner_name']
        };
        res.status(200).json({ nickname, temp_id, ...arena });

    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}

module.exports = {
    joinArena, createArena
}