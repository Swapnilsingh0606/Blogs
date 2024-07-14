const { createHmac, randomBytes } = require("crypto");
const { Router } = require('express');

const router = Router();

const User = require("../models/user");

router.get('/signin', (req, res) => {
    return res.render('signin')
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password);

    console.log("User: ", user);

    return res.redirect('/');
});

router.get('/signup', (req, res) => {
    return res.render('signup')
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password} = req.body;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    await User.create({
        fullName: fullName,
        email: email,
        password: hashedPassword,
        salt: salt
    });

    return res.render('home');
});

module.exports = router;