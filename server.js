const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const request    = require('request');
const IPSCreditScraper = require('ips-credit-scraper');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();

const config = {
  ipsthemes: {
    url: 'http://dev/ipsthemes2/wordpress/edd-api/v1/stats/'
    //url: 'https://ipsthemes.com/wordpress/edd-api/v1/stats/'
  }
}

/* IPS Themes Wordpress EDD API Sales */
router.route('/ipsthemes/credit/:key/:token')
  .get((req, res) => fetchIPSThemesCredit(req, res));

/* IPS Marketplace scraped account credit */
router.route('/ipsmarketplace/credit/:userName/:userPass')
  .get((req, res) => fetchIPSCredit(req, res));

/* Default API response */
router.get('/', (req, res) => res.json({ message: 'IPS Themes API :-)' }));

/* API Prefix */
app.use('/api', router);

function fetchIPSThemesCredit(req, res) {
  let requestOptions = {
    url: config.ipsthemes.url,
    qs: {
      key: req.params.key,
      token: req.params.token,
      type: 'earnings'
    }
  }

  request(requestOptions, (error, response, body) => res.send(body));
}

function fetchIPSCredit(req, res) {
  let scrape = new IPSCreditScraper({ auth: req.params.userName, password: req.params.userPass })

  return scrape
    .then((credit) => res.json(credit))
    .catch((err) => res.json(err));
}

app.listen(port);
console.log('Magic happens on port ' + port);

exports = module.exports = app;
