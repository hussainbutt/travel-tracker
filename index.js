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
app.get("/", async (req, res) => {

  //query to get data
  const result = await db.query(
    "SELECT country_code FROM visited_countries"
  )
  const data = result.rows;

  //convert result.rows into a proper array to send to ejs file
  let countries = [];

  data.forEach((country) => {
    countries.push(country.country_code);
  });

  res.render("index.ejs", {
    total: countries.length,
    countries: countries,
  })

});

app.post("/add", async (req, res) => {


  const input = req.body.country;
  console.log(input);
  const result = await db.query("SELECT country_code FROM countries WHERE country_name=$1", [input])
  if (result.rows.length != 0) {
    const data = result.rows[0];
    const countryCode = data.country_code;
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode,]);
  }
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
