const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/api/:sign', (req, res) => {
    axios
    .get(`https://ohmanda.com/api/horoscope/${req.params.sign}`)

    .then(zodiac => res.send(zodiac.data.horoscope))
});

module.exports = app;