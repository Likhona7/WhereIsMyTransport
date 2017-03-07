var express = require('express');

var router = express.Router();
var request = require("request");
var CLIENT_ID = '1a4c1e3d-7877-4035-8074-1cca8c8b27b6';
var CLIENT_SECRET = 'jBzalCDDcpvybvbIYM15vpvEXgUFARCfJcw+lx8plLU=';
var options = {
    method: "POST",
    headers: "ACCEPT: application/json",
    url: "https://identity.whereismytransport.com/connect/token",

    form: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: "transportapi:all"
    }
};

request(options, function (error, response, body) {
    TOKEN = JSON.parse(body).access_token;
    // subsequent requests go here, using the TOKEN

    var body = {
        geometry: {
            type: "Multipoint",
            coordinates: [[18.395448, -33.909531],
                          [18.416798, -33.912683]]
        }
    };

    var options = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + TOKEN
        },
        url: "https://platform.whereismytransport.com/api/journeys",
        body: JSON.stringify(body)
    };

    request(options, function (error, response, body) {
        console.log({ "Journeys": JSON.parse(body) });
    });
});









/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Trasport' });
});

module.exports = router;
