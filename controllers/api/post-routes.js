const router = require("express").Router();
const { Posts } = require("../../models");

// create new post
router.post("/", async (req, res) => {
  try {
    const dbPostData = await Posts.create({
      post_title: req.body.post_title,
      post_context: req.body.post_context,
      userid: req.session.userid,
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
