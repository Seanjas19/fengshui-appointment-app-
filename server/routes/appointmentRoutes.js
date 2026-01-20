const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");
const authorize = require("../middleware/authorization");

router.get("/", authorize, appointmentController.getAppointment);

router.post("/", authorize, appointmentController.createAppointment);

router.put("/:id", authorize, appointmentController.updateAppointment);

router.delete("/:id", authorize, appointmentController.deleteAppointment);

module.exports = router;