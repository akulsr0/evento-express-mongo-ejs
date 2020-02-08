const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

const Event = require('./models/Event');
const ShowcaseBox = require('./models/ShowcaseBox');
const Feedback = require('./models/Feedback');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', async (req, res) => {
  const result = await Event.find({});
  const showcaseResult = await ShowcaseBox.find({});
  res.render('index', {
    result,
    showcaseResult,
    showcaseResultLength: showcaseResult.length
  });
});

app.get('/about-us', (req, res) => {
  res.render('aboutus');
});

app.get('/contact-us', (req, res) => {
  res.render('contactus');
});

app.post('/contact-us', (req, res) => {
  const { name, email, feedback } = req.body;
  const feedbackObj = new Feedback({ name, email, feedback });
  feedbackObj
    .save()
    .then(() => res.render('feedbacksaved'))
    .catch(err => res.send(err.message));
});

app.get('/feedbacks', async (req, res) => {
  try {
    const feedbackResult = await Feedback.find({});
    res.render('feedbackpage', { feedbackResult });
  } catch (err) {
    res.send(err.message);
  }
});

app.get('/events', (req, res) => {
  res.render('events');
});

app.get('/events/all', async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.render('allevents', { allEvents });
  } catch (err) {
    res.send(err.message);
  }
});

app.get('/events/category', (req, res) => {
  res.render('category');
});

app.get('/events/category/:category', async (req, res) => {
  try {
    const categoryEvents = await Event.find({ category: req.params.category });
    res.render('categorypage', {
      cname: categoryEvents[0].category,
      categoryEvents
    });
  } catch (err) {
    res.send(err.message);
  }
});

app.get('/events/add', (req, res) => {
  res.render('addevent');
});

app.post('/events/add', (req, res) => {
  const { name, img, price, date, description, category } = req.body;
  const event = new Event({ name, img, price, date, description, category });
  event
    .save()
    .then(() => res.render('eventcreated'))
    .catch(err => {
      res.send(err.message);
    });
});

app.get('/events/delete', async (req, res) => {
  try {
    const eventsResult = await Event.find({});
    res.render('deleteevent', { eventsResult });
  } catch (err) {
    res.send(err.message);
  }
});

app.post('/events/delete/:id', (req, res) => {
  const eventId = req.params.id;
  Event.deleteOne({ _id: eventId }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.render('deletedsuccess');
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
