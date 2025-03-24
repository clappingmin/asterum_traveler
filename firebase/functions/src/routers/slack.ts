const express = require('express');
const router = express.Router();
// const cors = require('cors');
require('dotenv').config();

router.post('/', async (req: any, res: any) => {
  try {
    const message = req.body;

    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';

    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Slack Webhook 요청 실패: ${response.statusText}`);
    }

    // 응답 헤더에 명시적으로 CORS 허용 추가
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.json({ success: true, message: '🚀 Slack 메시지 전송 성공!' });
  } catch (error: any) {
    console.error('❌ Slack 메시지 전송 실패:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
