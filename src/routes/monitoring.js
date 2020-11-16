const express = require('express');
const router = express.Router();

// const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/monitoring', isAuthenticated, async (req, res) => {
    // const notes = await Note.find({user: req.user._id}).sort({ date: 'desc' }).lean();
    res.render('monitoring/status');
});
// monitoring
module.exports = router;