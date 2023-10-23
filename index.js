// Moduls import.
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Create an express app and set the port number.
const app = express();
const port = 3000;
const API_URL = "https://www.amiiboapi.com/api/"

// Use the public folder for static files.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data;

// Cuando el usuario vaya al Inicio, se debe renderizar el archivo index.ejs.
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/submit", async (req, res) => {
    const searchName = req.body.amiiboName;
    try {
        const result = await axios.get(API_URL + "amiibo/?character=" + searchName);
        res.render("index.ejs", { amiibos: result.data.amiibo});
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
})

// Listen on the predefined port and start the server
app.listen(port, () => {
    console.log(`Iniciado el servidor en el puerto ${port}`)
})