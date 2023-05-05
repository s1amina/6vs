const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
    res.render('dashboard', {session: req.session});
});

module.exports = router;

