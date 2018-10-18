const express = require("express");
const multer = require("multer");
const fs = require("fs")

const publicPath = "public/";
const uploadPath = "public/uploads/"
const port = 3000;
const app = express();
const upload = multer({ dest: uploadPath })

app.use(express.static(publicPath));
app.set("view engine", "pug")

const uploadedFiles = [];

app.get('/', function (req, res) {
  res.render('index', { title: 'Kenziegram With Pug', message: 'Welcome to Kenziegram With Pug' })
})

  // app.get('/', (request, response) => {
  //   const path = './public/uploads';
  //   fs.readdir(path, function (err, items) {
  //     console.log(items);
  //     response.send(`
  //   ${pictureDisplayer(items)}`);
  //   })
  // });

  app.post('/uploads', upload.single('myFile'), function (request, response, next) {
    console.log("Uploaded: " + request.file.filename);
    uploadedFiles.push(request.file.filename);
    response.end(`<h1>Congratulations you clicked a button!!!!</h1>
  <a href="/">Click here to go back!</a>
  <img src="uploads/${request.file.filename}"/>`);
  })

  app.listen(port, () => console.log("Server running on " + port))