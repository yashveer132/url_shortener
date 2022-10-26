const express = require('express');
const app = express();
const expressEJs = require('express-ejs-layouts');
const connectDB = require('./configuration/Dbconnect');
const URLS = require('./models/ShortURL');
const cors=require('cors')

//connect to database
connectDB();

//set ejs layout
app.use(expressEJs);

//setting viewengine
app.set('view engine', 'ejs');

//setup static
app.use(express.static(__dirname + '/assests'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

//global variables
app.use((req, res, next) => {
  res.locals.currentUrl =
    req.protocol + '://' + req.get('host') + req.originalUrl;
  next();
});

app.use(cors());

//pages
app.get('/', (req, res) => {
  res.render('index');
});

//post request
app.post('/', async (req, res) => {
  let errors = [];
  const { mainUrl, currentUrl, customUrl } = req.body;
  const CUrlCount = await URLS.findOne({
    customUrl: customUrl,
  }).countDocuments();
  if (!mainUrl || !currentUrl || !customUrl) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (CUrlCount > 0) {
    errors.push({ msg: 'This url custom name is already registered' });
  }
  if (errors.length > 0) {
    res.render('index', {
      errors,
    });
  } else {
    const URL = new URLS({
      mainUrl,
      currentUrl,
      customUrl,
    });

    URL.save();

    res.render('index', {
      currentUrl,
      customUrl,
    });
  }
});

//redirect to website
app.get('/:customUrl', async (req, res) => {
  const redirectUrl = await URLS.findOne({ customUrl: req.params.customUrl });
  const redirectUrlCount = await URLS.findOne({
    customUrl: req.params.customUrl,
  }).countDocuments();
  if (redirectUrlCount) {
    res.redirect(redirectUrl.mainUrl);
  } else {
    res.send('404 LINK NOT FOUND ');
  }
});

//port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
