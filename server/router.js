const express = require('express');
const router = require('express').Router();
const db = require('../database');

// ============ create routes ============
// register new user
router.post('/api/newuser', (req, res) => {
  const userInfo = req.body;
});

// register new battle
router.post('/api/newbattle', (req, res) => {
  const battleInfo = req.body; 
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
