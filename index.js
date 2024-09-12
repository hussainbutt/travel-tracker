import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


//DB connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "9510",
  port: 5432
})



const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
db.connect();
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {

  const countries = await checkVisisted();
  res.render("index.ejs", {
    total: countries.length,
    countries: countries,
  })

});

app.post("/add", async (req, res) => {
  const input = req.body.country;
  console.log(input);
  try {
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE  '%' || $1 || '%';", [input.toLowerCase()]);
    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
      res.redirect('/');
    } catch (err) {
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country already added!"
      });
    }


  } catch (err) {
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country not found!"
    });
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
