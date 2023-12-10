const fs = require("fs");

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: "true" }));

app.get("/", (req, res) => {
  fs.readFile("msg.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.send(` <form action="/store-msg" id="form" method="POST">
      <h1>${data}</h1>
      <label for="msg">Message</label>
      <br /><input type="text" id="msg" required /><br />
      <button type="submit">Send Message</button>
    </form>
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        document
          .getElementById("msg")
          .setAttribute("name", JSON.parse(localStorage.getItem("username")));
      });
    </script>`);
    }
  });
});

app.post("/store-msg", (req, res) => {
  const key = Object.keys(req.body)[0];
  const value = req.body[key];

  fs.appendFile("./msg.txt", `${key}: ${value}\n`, (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/login", (req, res, next) => {
  res.send(
    `<form action="/" id="loginForm" method="GET"><label for="userName">User Name</label><br><input type="text" id="userName" required /><br><button type="submit">Login</button></form> <script>
      document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("userName").value;
        localStorage.setItem("username", JSON.stringify(username));
        this.submit(); 
      });
    </script>`
  );
});

app.use((req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000);
