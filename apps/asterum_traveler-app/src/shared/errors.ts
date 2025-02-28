// 에러 메시지
export const ERROR_NO_DATA = 'No data available';

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
