const { createUrl, getAllUrl } = require("../controllers/url");
const router = require("express").Router();
const userVerification = require("../middleware/AuthMiddleware");

router.post("/create", userVerification, createUrl);
router.get("/myurls", userVerification, getAllUrl);
module.exports = router;
