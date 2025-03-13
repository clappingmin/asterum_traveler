import { render, screen } from '@testing-library/react';
import DearPage from './DearPage';

jest.mock('@/components/dear/WriteLetterButton', () => () => (
  <div data-testid="write-letter-button" />
));

jest.mock('@/components/dear/LettersView', () => () => <div data-testid="letters-view" />);
jest.mock(
  '@/components/global/error/FetchErrorBoundary',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="fetch-error-boundary">{children}</div>
);

describe('DearPage', () => {
  test('DearPage 랜더링 테스트', () => {
    render(<DearPage />);

    // 주요 UI 요소들이 존재하는지 확인
    expect(screen.getByText('DEAR.')).toBeInTheDocument();
    expect(screen.getByTestId('write-letter-button')).toBeInTheDocument();
    expect(screen.getByTestId('letters-view')).toBeInTheDocument();
    expect(screen.getByTestId('fetch-error-boundary')).toBeInTheDocument();
  });
});
