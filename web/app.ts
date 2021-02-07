import express from "express";

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('public/index.html');
});

app.listen(5000, () => {
  console.log("server is live at port 5000");
});

//TODO implement webpack instead of express