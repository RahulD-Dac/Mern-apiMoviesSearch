const express = require("express");
const app = express();
const session = require("express-session"); 

const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

const passport = require('passport');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


app.get("/", (req, res) => { res.render("index"); });
app.get("/register", (req, res) => { res.render("register"); });

app.post("/register", async (req, res) => {
         try {
                  // console.log(req.body.username);                  // res.send(req.body.username)
                  const password = req.body.password;
                  const cpassword = req.body.confirmPassword;
                  if (password === cpassword) {
                           const registerUser = new Register({
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: req.body.password,
                                    confirmPassword: req.body.confirmPassword
                           })
                           const registered = await registerUser.save();
                           res.status(201).render("index");
                  } else {
                           res.send("password not same");
                  }
         } catch (error) {
                  res.status(400).send(error);
         }

});

app.get("/login", (req, res) => { res.render("login"); });
app.post("/login", async (req, res) => {
         try {
                  const { username, password } = req.body;
                  const user = await Register.findByCredentials(username, password);
                  if (!user) {
                           res.status(404).send("Invalid username or password");
                  } else {
                           res.status(200).render("movies");
                  }
         } catch (error) {
                  res.status(500).send(error.message);
         }
});

app.get("/movies", (req, res) => {


      res.render("movies");
});

app.get("/search-movies", async (req, res) => {
         const searchQuery = req.query.search;
         const apiKey = "5c42cfe"; // Replace with your OMDB API key
         const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchQuery)}`;

         try {
                  const response = await fetch(apiUrl);
                  const data = await response.json();
                  if (data.Response === "True") {
                           res.render("movies", { movies: data.Search });
                  } else {
                           res.render("movies", { error: data.Error });
                  }
         } catch (error) {
                  res.render("login", { error: "An error occurred while fetching data" });
         }
});


// Middleware to store user info in locals
// app.use((req, res, next) => {
//          res.locals.user = req.session.user || null;
//          next();
// });

app.listen(port, () => {
         console.log(`server listening on port ${port}`);
});
