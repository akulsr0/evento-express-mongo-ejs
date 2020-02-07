const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/evento', () =>
  console.log('Database Connected')
);
