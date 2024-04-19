import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "jkomnik";
const yourPassword = "root";
const yourAPIKey = "07b07f28-5202-415a-b94b-912ed411a4df";
const yourBearerToken = "Bearer e9286bc1-2043-4754-9df0-345362a57d34";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {

  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch (error) {
    res.status(404).send("Error:", error.message)
  }
});

app.get("/basicAuth", async (req, res) => {
  
  try {
    const result = await axios.get(API_URL + "/all", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch (error) {
    res.status(404).send("Error:", error.message)
  }
   
  
});

app.get("/apiKey", async (req, res) => {

  try {
    const result = await axios.get(API_URL + "/filter?score=5", {
      params: {
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send("Error: ", error.message);
  }
});

app.get("/bearerToken", async (req, res) => {

  try {
  const result = await axios.get(API_URL + "/secrets/42", {
    headers: { 
      Authorization: yourBearerToken 
    },
  });
  res.render("index.ejs", { content: JSON.stringify(result.data) });
} catch (error) {
  res.status(404).send("Error: ", error.message);
}
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
