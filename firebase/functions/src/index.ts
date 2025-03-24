const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const slackRouter = require('./routers/slack');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/slack', slackRouter);

exports.app = functions.https.onRequest(app);
