import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("server is live at port 5000");
});
