const router = require("express").Router();
const contactController = require("../controllers/contactController");

router.post("/", contactController.createContact);

module.exports = router;