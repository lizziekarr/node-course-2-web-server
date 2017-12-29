const express = require('express')
const fs = require('fs')
const hbs = require('hbs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

//app.use() is how you register middleware
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = (`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server/log');
    }
  })
  next()
})

app.use((req, res, next) => {
  res.render('maintenance.hbs')
})

app.get('/', (req, res) => {
  // res.send('<h1>hello express!</h1>')
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'you have arrived!',
    currentYear: new Date().getFullYear()
  })
})

app.get('/about',  (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
})

app.get('/bad', (req, res) => {
  res.send({
    error: 'something is wrong'
  })
})

app.listen(3000, () => {
  console.log('server is up on port 3000');
})
