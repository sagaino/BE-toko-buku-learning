const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/auth/signin", controller.signin);
router.post("/auth/signup", controller.signup);
router.get("/auth/checkjwt", controller.checkJwt);

module.exports = router;