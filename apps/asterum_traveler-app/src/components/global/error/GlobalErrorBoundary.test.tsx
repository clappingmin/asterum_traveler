import { render, screen, fireEvent } from '@testing-library/react';
import GlobalErrorBoundary from './GlobalErrorBoundary';

jest.mock('../../../shared/errors', () => ({
  ...jest.requireActual('../../../shared/errors'),
  sendMessageToSlack: jest.fn(),
}));

describe('GlobalErrorBoundary', () => {
  const mockSendMessageToSlack = jest.requireMock('@/shared/errors').sendMessageToSlack;

  const ErrorComponent = () => {
    throw new Error('테스트 에러');
  };

  let originalLocation: Location;

  beforeAll(() => {
    originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('에러 발생 시 에러 메시지가 렌더링된다.', () => {
    render(
      <GlobalErrorBoundary>
        <ErrorComponent />
      </GlobalErrorBoundary>
    );

    expect(screen.getByText('잠시 후 시도해주세요')).toBeInTheDocument();
    expect(screen.getByText('요청을 처리하는데')).toBeInTheDocument();
    expect(screen.getByText('실패했습니다.')).toBeInTheDocument();
    expect(screen.getByText('홈으로 돌아가기')).toBeInTheDocument();
  });

  test('에러 발생 시 sendMessageToSlack이 호출된다.', () => {
    render(
      <GlobalErrorBoundary>
        <ErrorComponent />
      </GlobalErrorBoundary>
    );

    expect(mockSendMessageToSlack).toHaveBeenCalledTimes(1);
    expect(mockSendMessageToSlack).toHaveBeenCalledWith(expect.any(Error));
  });

  test('홈으로 돌아가기 버튼을 클릭하면 루트 경로로 이동한다.', () => {
    render(
      <GlobalErrorBoundary>
        <ErrorComponent />
      </GlobalErrorBoundary>
    );

    const backHomeButton = screen.getByText('홈으로 돌아가기');
    fireEvent.click(backHomeButton);

    expect(window.location.href).toBe('/');
  });

  test('정상적인 경우 children이 렌더링된다.', () => {
    render(
      <GlobalErrorBoundary>
        <div>정상적인 내용</div>
      </GlobalErrorBoundary>
    );

    expect(screen.getByText('정상적인 내용')).toBeInTheDocument();
  });
});
