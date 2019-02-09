var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Show top ten high score in decending order
  app.get("/api/users", function(req, res) {
    db.users
      .findAll({
        limit: 10,
        order: [["currenthighscore", "DESC"]]
      })
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.users
      .create({
        name: req.body.name,
        pictureurl: req.body.pic,
        catDog: req.body.catDog,
        city: req.body.city,
        password: req.body.password
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });

    db.users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Delete an users by id
  app.delete("/api/users/:id", function(req, res) {
    db.users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};
