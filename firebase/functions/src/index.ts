const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'https://www.asterumtraveler.kr' }));
app.use(express.json());

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';

app.post('/', async (req: any, res: any) => {
  try {
    const message = req.body;

    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!slackResponse.ok) {
      throw new Error(`Slack Webhook 요청 실패: ${slackResponse.statusText}`);
    }

    res.json({ success: true, message: '🚀 Slack 메시지 전송 성공!' });
  } catch (error: any) {
    console.error('❌ Slack 메시지 전송 실패:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.sendSlackMessage = functions.https.onRequest(app);
