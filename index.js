const PORT = 8000;
const axios = require("axios").default;
const express = require("express");

const app = express();
app.get("/word", (req, res) => {
    const options = {
        method: "GET",
    url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    params: { count: "5", wordLength: "5" },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": "4050c65767mshce81a987a1e7c25p196598jsnc27f33d3b3ce",
    },
  };
  
  axios
  .request(options)
  .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
});

app.listen(PORT, () => console.log("Server is running on" + PORT))