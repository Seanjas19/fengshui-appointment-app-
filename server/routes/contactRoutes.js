const router = require("express").Router();
const contactController = require("../controllers/contactController");

const validInfo = require("../middleware/validInfo.js");
const { contactValidator } = require("../utils/validators.js");

router.post("/", contactValidator, validInfo, contactController.createContact);

module.exports = router;