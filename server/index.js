const express = require('express');
// const router = require('./router');
const path = require('path');
const app = express();
const port = 80;

// app.use('/', router);
app.use('/', express.static(path.resolve(__dirname, '../public/homepage')));
app.use('/bundle/', express.static(path.resolve(__dirname, '../public/')));
app.use('/typingtest', express.static(path.resolve(__dirname, '../public/typingtest')));
app.use('/users/id=:id', express.static(path.resolve(__dirname, '../public/userInfo')));

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});



