//package requis
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

//créee le server express
const app = express();

//le numero port du serveur express
const port = process.env.PORT || 3000;

//installer les template engine
app.set("view engine", "ejs");
app.use(express.static("public0"));

//passer les datas html en post request
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json());

app.get("/", (req, res)=>{
    res.render("index")
});

app.post("/convert-mp3", async (req, res)=>{
    const videoId = req.body.videoId;
    console.log(videoId);
    if(videoId === undefined ||
       videoId === "" ||
       videoId === null ){
        return res.render("index", {success: false,
            message : "Veuller entrer votre url"})
       } else { 
           const fetchApi = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
               "method": "GET",
               "headers": {
               "x-rapidapi-key": process.env.API_KEY,
               "x-rapidapi-host": process.env.API_HOST
               }
           });
           const fetchResponse = await fetchApi.json();
           if(fetchResponse.status === "ok")
           return res.render("index", {success: true, song_title: fetchResponse.song_title,
        song_link: fetchResponse.link});
        else
            return res.render("index", {success: false, message: fetchResponse.msg})
       }
});
//démarrer le server
app.listen(port, ()=>{
    console.log(`Le serveur démarre sur le port: ${port}`);
});

