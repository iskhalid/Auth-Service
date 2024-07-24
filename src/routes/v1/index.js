const UserController = require("../../controllers/user-contoller")

const express = require('express');
const { AuthRequestValidators } = require("../../middlewares");
const router = express.Router();

router.post("/sign-up", AuthRequestValidators.validateUserAuth, UserController.create )
router.post("/sign-in", AuthRequestValidators.validateUserAuth, UserController.signIn)
router.get("/isAuthenticated", AuthRequestValidators.validateUserToken, UserController.isAuthenticated )

module.exports = router