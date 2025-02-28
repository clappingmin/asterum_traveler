import { createStandaloneToast } from '@chakra-ui/react';

/**
 * 에러메시지 토스트 띄우기
 * @param {string} message
 */
export function showErrorToast(message = '요청을 처리하는 중 오류가 발생했습니다.') {
  const { toast } = createStandaloneToast();

  toast({
    id: 'error-toast',
    title: '오류 발생',
    description: message,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
}

// 에러 종류
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
}

class UiError extends Error {
  componentName: string;
  parentComponentName?: string;

  constructor(message: string, componentName: string, parentComponentName?: string) {
    super(message);
    this.name = 'UiError';
    this.componentName = componentName;
    this.parentComponentName = parentComponentName;
  }
}

export { ApiError, UiError };

// 에러 메시지
export const ERROR_NO_DATA = 'No data available';
