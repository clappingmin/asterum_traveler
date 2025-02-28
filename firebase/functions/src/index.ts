/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const functions = require('firebase-functions');
const axios = require('axios');

exports.sendSlackMessage = functions.https.onRequest(async (req: any, res: any) => {
  try {
    const { message } = req.body;
    const webhookURL = functions.config().slack.webhook_url;

    await axios.post(webhookURL, { text: message });

    res.status(200).json({ success: true, message: 'Slack 메시지 전송 완료!' });
  } catch (error) {
    console.error('Slack 메시지 전송 실패:', error);
    res.status(500).json({ success: false, error: 'Slack 메시지 전송 실패' });
  }
});
