const shortid= require("shortid")
const URL= require('../models/url');
const { redirect } = require("react-router-dom");
async function handleGenerateNewShortURL (req,res){
const body = req.body;
if(!body.url) return res.status(400).json({error:"url is require"});
const shortId = shortid(8);
await URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[]

})

 return res.json({id:shortId})

}

async function handleGetAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;

        // Find the entry by shortId
        const result = await URL.findOne({ shortId });

        // Check if the result is found
        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Return total clicks and analytics
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (error) {
        console.error('Error retrieving analytics:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports ={
    handleGenerateNewShortURL,
    handleGetAnalytics,
   
}

