var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.users.findAll({}).then(function(dbUsers) {
      res.render("index", {
        msg: "See who is playing",
        users: dbUsers
      });
    });
  });

  app.get("/home", function(req, res) {
    db.users.findAll({}).then(function(dbUsers) {
      res.render("index", {
        msg: "See who is playing",
        users: dbUsers
      });
    });
  });

  // Load users page and pass in an users by id
  app.get("/user/:id", function(req, res) {
    db.users.findOne({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.render("userfile", {
        users: dbUsers
      });
    });
  });

  // Render game page for any unmatched routes
  app.get("/game", function(req, res) {
    res.render("game");
  });

  // Render input form page for any unmatched routes
  app.get("/signin", function(req, res) {
    res.render("input");
  });

  // Render score page for any unmatched routes
  app.get("/score", function(req, res) {
    db.users
      .findAll({
        limit: 10,
        order: [["currenthighscore", "DESC"]]
      })
      .then(function(dbUsers) {
        res.render("scoreDisplay", {
          users: dbUsers
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
