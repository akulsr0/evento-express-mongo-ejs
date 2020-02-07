const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

const Event = require('./models/Event');
const ShowcaseBox = require('./models/ShowcaseBox');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', async (req, res) => {
  const result = await Event.find({});
  const showcaseResult = await ShowcaseBox.find({});
  console.log(showcaseResult.length);
  res.render('index', {
    result,
    showcaseResult,
    showcaseResultLength: showcaseResult.length
  });
});

app.get('/events', (req, res) => {
  res.render('events');
});

app.get('/events/add', (req, res) => {
  res.render('addevent');
});

app.post('/events/add', (req, res) => {
  const { name, img, price, date, description } = req.body;
  const event = new Event({ name, img, price, date, description });
  event
    .save()
    .then(() => res.send('Event Saved'))
    .catch(err => {
      res.send(err.message);
    });
});

app.get('/add-showcase', (req, res) => {
  res.render('addshowcase');
});

app.post('/add-showcase', (req, res) => {
  const { img1, img2, img3 } = req.body;
  const showcaseBox = new ShowcaseBox({ img1, img2, img3 });
  showcaseBox
    .save()
    .then(() => res.send('ShowcaseBox Saved'))
    .catch(err => res.send(err.message));
});

app.listen(port, () => console.log(`Server is running at port ${port}...`));
