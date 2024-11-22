const express = require("express");
const connectToMongoDB = require("./conect")
const app = express();
const PORT = 8001;
const URL = require('./models/url');
app.use(express.json());
require('dotenv').config();
const dbUrl= process.env.DATABASE_URL
connectToMongoDB(dbUrl).then(
    ()=>console.log('connected to MongoDB')
);

const urlRoute = require("./routes/url")
app.use("/url",urlRoute)

app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
  const entry =   await URL.findOneAndUpdate({
            shortId
    },{
        $push:{
           visitHistory :{
            timestamp:Date.now()
           },
        }
    })
    res.redirect(entry.redirectURL)
})
app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));