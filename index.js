import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;


//database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();


//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//initialisation
let currentUserId = 1;
let users = [];


async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}


async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}




app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});




app.post("/add", async (req, res) => {
  const input = req.body["country"];
  console.log(input);
  const currentUser = await getCurrentUser();
  console.log(currentUser);

  try {
    if (input == "") {
      throw new Error("Please fill the field");
    } else {
      try {
        const result = await db.query(
          "SELECT code FROM countries WHERE LOWER(name) LIKE '%' || $1 || '%';",
          [input.toLowerCase()]
        );
        const data = result.rows[0];
        console.log(data, "data");
        let countryCode = "";
        if (data != undefined) {
          countryCode = data.code;
        } else throw new Error("Please Enter a Valid country name");
        console.log(countryCode);
        await db.query(
          "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
          [countryCode, currentUserId]
        );
        res.redirect("/");
      } catch (err) {
        console.error("No match error handled");
        const countries = await checkVisisted();
        const currentUser = await getCurrentUser();
        res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          users: users,
          color: currentUser.color,
          error: "Please Enter a valid country name",
          placeholder_color: "red",
        });
      }
    }
  } catch (err) {
    console.error("empty input handled");
    const countries = await checkVisisted();
    const currentUser = await getCurrentUser();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      error: "Please fill the field with the name of a country",
      placeholder_color: "red",
    });
  }
});




app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});





app.post("/new", async (req, res) => {
  try 
  {
    let name = req.body.name;
    let color = "teal";
  
  
    if(req.body.color)
    {
      color=req.body.color;
    }
  
   if(name!=''){ 
    
  
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
      [name, color]
    );
  
    const id = result.rows[0].id;
    currentUserId = id;
  
    res.redirect("/");}
  
    else 
    {
      res.render("new.ejs",{empty_name:'Please enter a name', text_color:'red'});
    }
  }
  catch(error)
  {
    console.error('duplicated name error handled');
    res.render("new.ejs",{empty_name:'Name already exists', text_color:'red'});
  }
  });
  




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
