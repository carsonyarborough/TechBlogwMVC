const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => 
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });



      res.json(newUser);
    });
   catch (err) {
    res.status(500).json(err);
  }
;

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);



    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});



module.exports = router;
