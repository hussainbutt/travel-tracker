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
db.connect((err) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log("Connected to the Database");
  }
});
//DB connection end 

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
