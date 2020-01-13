const express = require('express');
const router = require('express').Router();
const request = require('request');
const controller = require('./controller');

// ============ create routes ============
// register new user
router.post('/api/newuser', (req, res) => {
  const userInfo = req.body;
});

// register new battle
router.post('/api/newbattle', (req, res) => {
  const battleInfo = req.body; 
});

// create new paragraphs to be used
router.get('/api/newparagraph', (req, res) => {
  const newParagraph = controller.generateNewParagraph();
  res.status(200).send(newParagraph);
});

// ============ read routes ============
// get specified user
router.get('/api/user/:id', (req, res) => {
  // return user collection 
  const user_id = req.params;
  
});

// get most recent battle information
router.get('/api/mostrecentbattles', (req, res) => {
  // could potential use lazy loading here ...
});

// get random sample texts to be typed
router.get('/api/getsampletext', (req, res) => {
  // use either faker to generate sample texts or use an api...
});

// ============ update routes ============
// update users highest wpm recorded
router.put('/api/updatewpm', (req, res) => {

});

module.exports = router;
