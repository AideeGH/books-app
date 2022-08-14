require("dotenv").config();
const userRoutes = require("./server/routes/users.routes");
const favoritesRoutes = require("./server/routes/favorites.routes");
const passport = require("./server/config/passport.config");
const cookieParser = require("cookie-parser");

const express = require("express");

const app = express();

const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.use(cookieParser());
app.use(passport.initialize());

app.use(express.static(__dirname + "/build"));

app.use("/api/favorites", favoritesRoutes);
app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  return res.sendFile("build/index.html", { root: __dirname + "/" });
});

app.listen(PORT, () => console.log("Server is up and running"));
