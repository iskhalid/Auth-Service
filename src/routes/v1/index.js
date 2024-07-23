const UserController = require("../../controllers/user-contoller")

const express = require('express')
const router = express.Router();

router.post("/sign-up", UserController.create )
router.post("/sign-in", UserController.signIn)

module.exports = router