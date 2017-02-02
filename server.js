const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const IPSCreditScraper = require('ips-credit-scraper');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();

router.use(function(req, res, next) {
  console.log('Processing...');
  next();
});

router.route('/credit/:userName/:userPass')
  .get(function(req, res) {
    let scrape = new IPSCreditScraper({
      auth: req.params.userName,
      password: req.params.userPass
    })

    scrape
      .then((credit) => res.json(credit))
      .catch((err) => res.json(err));
  });

router.get('/', function(req, res) {
  res.json({ message: 'IPS Themes API :-)' });
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

exports = module.exports = app;
