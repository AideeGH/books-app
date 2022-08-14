const express = require("express");
const router = express.Router();
const { add, remove, getByUser, getAll } = require("../models/favorites.model");
const auth = require("../middleware/auth.middleware");

router.put("/add", auth, async (req, res) => {
  const favorite = req.body;
  if (!favorite.book_id || !favorite.title || !favorite.pic) {
    return res.send({
      success: false,
      data: null,
      error: "Invalid data provided",
    });
  }
  const resObj = await add({ ...favorite, user_id: req.user.id });

  return res.send(resObj);
});

router.delete("/delete/:book_id", auth, async (req, res) => {
  const book_id = req.params.book_id;
  const resObj = await remove(book_id, req.user.id);

  return res.send(resObj);
});

router.get("/user", auth, async (req, res) => {
  const resObj = await getByUser(req.user.id);

  return res.send(resObj);
});

router.get("/all", async (req, res) => {
  const resObj = await getAll();

  return res.send(resObj);
});

module.exports = router;
