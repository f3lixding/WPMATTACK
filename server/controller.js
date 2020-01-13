const LoremIpsum = require('lorem-ipsum').LoremIpsum;
// const db = require('../database');

// import initialization
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 10,
    min: 6
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

// Generate a paragraph to be used
module.exports.generateNewParagraph = function() {
  return lorem.generateParagraphs(5);
};