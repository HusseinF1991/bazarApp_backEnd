const express = require("express");
const router = express.Router();
const Category = require("../../../model/category");

router.delete("/", (req, res) => {
  Category.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((category) => {
      res.status(200).send({deleted : category});
    })
    .catch((err) => {
      console.log(err);
      if(err.name === "SequelizeForeignKeyConstraintError")
      {
        res.send({err : err.name});
      }
      else{
        res.send({err : err})
      }
    });
});

module.exports = router;
