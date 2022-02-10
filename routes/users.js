const router = require("express").Router();

module.exports = (db) => {
  router.get("/:id", (request, response) => {
    db.getUserWithId(Number(request.params.id))

      .then((result) => {
        response.json(result.rows);
      })
      .catch((err) => {
        console.log(err.message)
        response.status(500).json(err.message)
        return;
      });
  });

  return router;
};
