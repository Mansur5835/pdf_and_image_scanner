const express = require("express");
const pdfParse = require("pdf-parse");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const tesseract = require("tesseract.js");
const multer = require('multer');

const app = express();

// app.use(fileUpload());
app.use(express.json())
app.set('view engine', 'ejs');

// console.log(uploader);

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
        storage: storageImage
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




app.listen(2000, () => {
    console.log("00000----------111111");
})





