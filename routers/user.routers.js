const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPost,
  usersPut,
  usersDelete,
} = require("../controllers/user.controllers");
const {
  isRoleValid,
  emailExists,
  existsUserForId,
} = require("../heplers/validate-db");
const { NameNotEmpty, EmailNotEmpty } = require("../heplers/validate-empty");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole, hasRole } = require("../middlewares/validate-role");
const Role = require("../models/role.models");

const router = Router();

router.get("/", [validateJWT, hasRole("ADMIN"), validateFields], userGet);

router.post(
  "/",
  [
    validateJWT,
    hasRole("ADMIN"),
    check("name", "The name is invalid").not().isEmpty(),
    check("password", "Invalid password, must exceed 6 characters").isLength({
      min: 6,
    }),
    check("email", "The email is invalid").isEmail(),
    check("email").custom(emailExists),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  userPost
);

router.put(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN"),
    check("name").custom(NameNotEmpty),
    check("email").custom(EmailNotEmpty),
    check("email").custom(emailExists),
    check("id", "Not valid id").isUUID(4),
    check("id").custom(existsUserForId),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    //isAdminRole,
    hasRole("ADMIN"),
    check("id", "No es un ID válido").isUUID(4),
    check("id").custom(existsUserForId),
    validateFields,
  ],
  usersDelete
);

module.exports = router;
