import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("APP IS RUNNING!");
});

const PORT = 8001;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
