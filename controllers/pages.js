const router = require("express").Router();
const { Posts, Comments, User } = require("../models");

// GET all post for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});


router.get("/game", (req, res) => {
  if (req.session.loggedIn) {
    res.render("game",{
      loggedIn: req.session.loggedIn,
    });
  }
  else{
    res.redirect("/login");
  }
});

router.get("/tasks", (req, res) => {
  if (req.session.loggedIn) {
    res.render("user-homepage",{
      loggedIn: req.session.loggedIn,
    });
  }
  else{
    res.redirect("/login");
  }
})

module.exports = router;
