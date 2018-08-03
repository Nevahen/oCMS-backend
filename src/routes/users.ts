import * as express from "express";
import * as bodyParser from "body-parser";
import { QueryUtils } from "../utils/QueryUtils";
import { UserController } from "../models/user-controller";
import User from "../models_sequelize/user";
import Page from "../models_sequelize/page";
import PageTag from "../models_sequelize/pagetag";
import { IIncludeOptions } from "sequelize-typescript";

var router = express.Router();
const userController = new UserController();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  Page.find({
    where: {
      page_id: 173
    },
    include: [{ model: PageTag, through: { attributes: [] } }]
  }).then(page => res.send(page));
});

router.get("/:id", (req, res) => {
  User.find({
    where: { userid: req.params.id }
  })
    .then(user => {
      if (user !== null) {
        res.send(user);
      } else {
        res.status(404).send({ error: "not found" });
      }
    })
    .catch(err => res.send(err));
});

//router.post('/', userController.createUser)

export = router;
