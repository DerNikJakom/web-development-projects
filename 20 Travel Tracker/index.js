import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "testing",
  host: "localhost",
  database: "world",
  password: "testing",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    // TODO: error: [String]
  });
});

//INSERT new country
app.post("/add", async (req, res) => {
  const input = capitalize(req.body.country.trim()); // ! Germany

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE country_name = $1", // ! DE
      [input]
    );
    if (result.rows.length !== 0) {
      const visitedCountry = await db.query(
        "SELECT country_code FROM visited_countries WHERE country_code = $1",
        [result.rows[0].country_code]
      );
      console.log(result.rows[0].country_code);
    }

  
    if (result.rows.length !== 0) {
      const data = result.rows[0];
      const countryCode = data.country_code;
  
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)",
      [countryCode]
      );
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
