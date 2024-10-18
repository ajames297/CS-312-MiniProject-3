import express from "express"; // lines 1 -30 are from 8.2 Postgres Read 
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "BlogDB",
  password: "r3incarn@t3",
  port: 5432,
});
db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static("public"));

let blogPosts = [];
  db.query("SELECT * FROM blogs_test", (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
      blogPosts = res.rows;
    }
    db.end();
  });

// Route to render the main page (lines 32 - 41 are from 6.1 Blog API Project, server.js file)
app.get("/", async (req, res) => {
      res.render("index.ejs", { blogPosts });
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs");
});

app.post("/new", (req, res) => {
    const title = req.body["title"];
    const body = req.body["body"];
    const creator_name = req.body["creator_name"];
    const date_created = new Date();
    // from INSERT and ADD DATA - Travel Tracker Part 2 15:00
    const db = new pg.Client({
      user: "postgres",
      host: "localhost",
      database: "BlogDB",
      password: "r3incarn@t3",
      port: 5432,
    });
    
      db.query("INSERT INTO blogs_test (creator_name, title, body, date_created) VALUES ($1, $2, $3, $4)",
        [creator_name, title, body, date_created]);
        //leaving the id because it is auto-generated
        res.redirect("/");
    });

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});