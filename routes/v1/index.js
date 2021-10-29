const express = require("express");

const router = express.Router();
///likes/toggle?likeable_id=<post/comment id>&likeable_type=<Post or Comment>

router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments.js"));
router.use("/likes", require("./likes"));

module.exports = router;
