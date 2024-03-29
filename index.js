const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, })); 
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index.ejs', { name: 'postgres'});
});

const itemsRouter = require('./routes/items')
app.use('/items', itemsRouter);

const apiRouter = require('./routes/api')
app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).render('404');
});

const server = app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`)
});

module.exports = server;