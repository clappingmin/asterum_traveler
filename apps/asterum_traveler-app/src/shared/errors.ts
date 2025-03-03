import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();
/**
 * 에러메시지 토스트 띄우기
 * @param {string} message
 */
export function showErrorToast(message = '요청을 처리하는 중 오류가 발생했습니다.') {
  toast({
    id: 'error-toast',
    title: '오류 발생',
    description: message,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
}

class ApiError extends Error {
  apiName: string;
  responseMessage?: string;
  canRetry?: boolean;

  constructor(message: string, apiName: string, canRetry?: boolean) {
    super(message);
    this.name = 'ApiError';
    this.apiName = apiName;
    this.canRetry = canRetry;
  }

  convertSlackMessage = () => {
    return {
      text: `🚨 *API 오류 발생!*`,
      blocks: [
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `*🚨 API 오류 발생!*` },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*API 이름:*\n\`${this.apiName}\`` },
            {
              type: 'mrkdwn',
              text: `*재시도 가능:*\n\`${this.canRetry ? '✅ 가능' : '❌ 불가'}\``,
            },
          ],
        },
        {
          type: 'section',
          text: { type: 'mrkdwn', text: `*에러 메시지:*\n\`\`\`${this.message}\`\`\`` },
        },
      ],
    };
  };
}

export { ApiError };

// 에러 메시지
export const ERROR_NO_DATA = 'No data available';

/**
 * 에러메시지 슬랙으로 보내기
 * @param {unknown} error
 */
export const sendMessageToSlack = async (error: unknown) => {
  try {
    const functionURL = import.meta.env.VITE_FIREBASE_FUNCTION_SEND_TO_SLACK_URL;

    const message =
      error instanceof ApiError ? error.convertSlackMessage() : unknownErrorToSlackMessage(error);

    const response = await fetch(functionURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const text = await response.text();

    try {
      const result = JSON.parse(text);
      console.log('Slack 메시지 전송 결과:', result);
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
    }
  } catch (error) {
    console.error('클라이언트 Slack 메시지 전송 실패:', error);
  }
};

const unknownErrorToSlackMessage = (error: unknown) => {
  let errorMessage = '알 수 없는 오류가 발생했습니다.';
  let errorStack = '';
  let errorName = 'UnknownError';

  if (error instanceof Error) {
    errorMessage = error.message;
    errorStack = error.stack || '스택 정보 없음';
    errorName = error.name;
  }

  return {
    text: `🔥 *예기치 못한 오류 발생!*`,
    blocks: [
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*🔥 예상치 못한 오류 발생!*` },
      },
      {
        type: 'section',
        fields: [{ type: 'mrkdwn', text: `*에러 이름:*\n\`${errorName}\`` }],
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*에러 메시지:*\n\`\`\`${errorMessage}\`\`\`` },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*스택 트레이스:*\n\`\`\`${errorStack.slice(0, 500)}...\`\`\``,
        },
      },
    ],
  };
};
