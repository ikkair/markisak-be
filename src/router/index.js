// Import express and router
const express = require("express");
const router = express.Router();

// Import route
const adminRouter = require("./admin");
const recipeRouter = require("./recipe");
const userRouter = require("./user");
const commentRouter = require("./comment");

router.use("/admin", adminRouter);
router.use("/recipe", recipeRouter);
router.use("/user", userRouter);
router.use("/comment", commentRouter);

// Export router
module.exports = router;
