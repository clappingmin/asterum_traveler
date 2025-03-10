import { render, screen, fireEvent } from '@testing-library/react';
import FetchErrorBoundary from './FetchErrorBoundary';
import { ApiError } from '../../../shared/errors';

jest.mock('../../../shared/errors', () => ({
  ...jest.requireActual('../../../shared/errors'),
  sendMessageToSlack: jest.fn(),
}));

describe('FetchErrorBoundary', () => {
  const mockSendMessageToSlack = jest.requireMock('../../../shared/errors').sendMessageToSlack;

  const ErrorComponent = () => {
    throw new ApiError('테스트 에러', 'FetchErrorBoundaryTest', true);
  };

  const UnknownErrorComponent = () => {
    throw new Error('알 수 없는 에러');
  };

  const onRetryMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('ApiError가 발생하면 에러 메시지와 다시 시도 버튼이 보인다.', () => {
    render(
      <FetchErrorBoundary onRetry={onRetryMock}>
        <ErrorComponent />
      </FetchErrorBoundary>
    );

    expect(screen.getByText('잠시 후 시도해주세요')).toBeInTheDocument();
    expect(screen.getByText('요청을 처리하는데')).toBeInTheDocument();
    expect(screen.getByText('실패했습니다.')).toBeInTheDocument();
    expect(screen.getByText('다시 시도')).toBeInTheDocument();
  });

  test('알 수 없는 에러가 발생하면 알 수 없는 오류 메시지가 보인다.', () => {
    render(
      <FetchErrorBoundary>
        <UnknownErrorComponent />
      </FetchErrorBoundary>
    );

    expect(screen.getByText('알 수 없는 오류가 발생했습니다')).toBeInTheDocument();
  });

  test('다시 시도 버튼 클릭 시 onRetry가 호출된다.', () => {
    render(
      <FetchErrorBoundary onRetry={onRetryMock}>
        <ErrorComponent />
      </FetchErrorBoundary>
    );

    const retryButton = screen.getByText('다시 시도');
    fireEvent.click(retryButton);

    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  test('에러 발생 시 sendMessageToSlack이 호출된다.', () => {
    render(
      <FetchErrorBoundary>
        <ErrorComponent />
      </FetchErrorBoundary>
    );

    expect(mockSendMessageToSlack).toHaveBeenCalledTimes(1);
    expect(mockSendMessageToSlack).toHaveBeenCalledWith(expect.any(ApiError));
  });

  test('정상적인 경우 children이 렌더링된다.', () => {
    render(
      <FetchErrorBoundary>
        <div>정상적인 내용</div>
      </FetchErrorBoundary>
    );

    expect(screen.getByText('정상적인 내용')).toBeInTheDocument();
  });
});
