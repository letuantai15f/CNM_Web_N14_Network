

const express = require('express');

const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
app.engine('hbs', exphbs.engine());
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})