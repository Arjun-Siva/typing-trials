const Paragraph = require("../models/paragraphModel");
const fetch = require("node-fetch");

//get text from API or fetch a random para from the DB
const getParagraph = async (req, res) => {
    try {
        const response = await fetch(process.env.PARA_API);
        const responseText = await response.text();
        if(responseText.length < 20){
            throw new Error("API failure")
        }

        const data = await responseText.replace("\n\n", " ");
        
        res.status(200).send(data);
    } catch (err) {
        const response = await Paragraph.aggregate([
            { $match: {} },
            { $sample: { size: 1 } },
        ]).exec();

        res.status(200).send(response[0].data);
    }

}

module.exports = {
    getParagraph
}