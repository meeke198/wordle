const path = require("path");
const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("public"));
app.get("/word", (req, res) => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    params: { count: "5", wordLength: "5" },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data[0]);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/check", (req, res) => {
  const word = req.query.word;
  console.log("app.get frontend request", req);
  console.log("app.get backend response", res);
  const options = {
    method: "GET",
    url: "https://twinword-word-graph-dictionary.p.rapidapi.com/theme/",
    params: { entry: word },
    headers: {
      "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_DIC_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log("axios backend check response.data", response.data);
      console.log(response.data);
      res.json(response.data.result_msg);
      // console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(process.env.PORT || 8000, () => console.log("Server running on port " + PORT));
