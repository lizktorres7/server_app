const { Router } = require("express");
const { check } = require("express-validator");
const { login, register } = require("../controllers/auth.controllers");

const { validateFields } = require("../middlewares/validate-fields");

const { emailExists } = require("../heplers/validate-db");

const router = Router();

router.post(
  "/login",
  [
    check("email", "The email is invalid").isEmail(),
    check("password", "The email is invalid").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/register",
  [
    check("name", "The name is invalid").not().isEmpty(),
    check("password", "The email is invalid").not().isEmpty(),
    check("email", "The email is invalid").isEmail(),
    check("email").custom(emailExists),
    validateFields,
  ],
  register
);

module.exports = router;
