class ApiError extends Error {
  apiName: string;
  statusCode: number;
  responseMessage?: string;

  constructor(message: string, apiName: string, statusCode: number, responseMessage?: string) {
    super(message);
    this.name = 'ApiError';
    this.apiName = apiName;
    this.statusCode = statusCode;
    this.responseMessage = responseMessage;
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
