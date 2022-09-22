const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('dist'));
app.use(express.static('public'));

// app.get('/api/:sign', (req, res) => {
//     axios
//     // .get(`https://ohmanda.com/api/horoscope/${req.params.sign}`)
//     .get(`https://aztro.sameerkumar.website/?sign=${req.params.sign}&day=today`)

//     .then(zodiac => res.send(zodiac.data.horoscope))
// });

module.exports = app;