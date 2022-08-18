const express = require("express");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const tesseract = require("tesseract.js");
const multer = require('multer');
const app = express();
const winston = require("winston");

app.use(express.json())
app.set('view engine', 'ejs');
require("./config/prod")(app);




const storageImage = multer.diskStorage({
    destination: function (req, file, cd) {
        console.log(file);
        cd(null, "images")
    },
    filename: function (req, file, cd) {

        cd(null, "salom.png")

    }
});

const storagePdf = multer.diskStorage({
    destination: function (req, file, cd) {
        console.log(file);
        cd(null, "pdf-files")

    },
    filename: function (req, file, cd) {
        cd(null, "salom.pdf")
    }
});

const uploadImage = multer(
    {
        storage: storageImage
    }
).single('image')


const uploadPdf = multer(
    {
        storage: storagePdf
    }
).single('pdf')



app.post("/pdf-to-text", uploadPdf, (req, res) => {
    setTimeout(() => {
        pdfParse("./pdf-files/salom.pdf").then(result => {
            res.send(result.text);
        });
    }, 1000)
});




app.post("/image-to-text", uploadImage, (req, res) => {
    const lang = req.body.lang;

    setTimeout(() => {
        tesseract.recognize(
            "./images/salom.png",
            lang,
            { logger: m => console.log(m) }

        ).then(({ data: { text } }) => {
            // console.log(text);
            res.send(text);
        });
    }, 1000)

});




const post = process.env.PORT || 2000;

console.log(app.get("env"));


const server = app.listen(post, () => {
    winston.info("00000----------111111")

})

module.exports = server;





