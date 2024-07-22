const UserController = require("../../controllers/user-contoller")

const express = require('express')
const router = express.Router();

router.post("/sign-up", UserController.create )

module.exports = router