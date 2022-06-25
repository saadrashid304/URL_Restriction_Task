var express = require("express");
var router = express.Router();
var User = require("../controller/main");

router.post("/signin", User.signin);
router.get("/dashboard/:email", User.details);

module.exports = router;
