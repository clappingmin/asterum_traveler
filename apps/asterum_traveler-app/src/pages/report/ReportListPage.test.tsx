import { render, screen, fireEvent } from '@testing-library/react';
import ReportListPage from './ReportListPage';

// Mock 데이터 및 컴포넌트
jest.mock(
  '../../components/global/error/FetchErrorBoundary',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="fetch-error-boundary">{children}</div>
);

jest.mock('../../components/report/ReportListView', () => ({ category }: { category: string }) => (
  <div data-testid="report-list-view">{`Category: ${category}`}</div>
));

describe('ReportListPage', () => {
  test('ReportListPage 렌더링 테스트', () => {
    render(<ReportListPage />);

    // 주요 UI 요소 확인
    expect(screen.getByText('REPORT')).toBeInTheDocument();
    expect(screen.getByTestId('fetch-error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('report-list-view')).toHaveTextContent('Category: all');

    // 모든 탭이 존재하는지 확인
    ['All', 'Album', 'Fashion', 'Game', 'Live', 'etc.'].forEach((tabName) => {
      expect(screen.getByText(tabName)).toBeInTheDocument();
    });
  });

  test('탭 클릭 시 category 상태가 변경되는지 확인', () => {
    render(<ReportListPage />);

    // 'Fashion' 탭 클릭
    const fashionTab = screen.getByText('Fashion');
    fireEvent.click(fashionTab);

    // ReportListView에 전달된 category가 변경되었는지 확인
    expect(screen.getByTestId('report-list-view')).toHaveTextContent('Category: fashion');

    // 'Game' 탭 클릭
    const gameTab = screen.getByText('Game');
    fireEvent.click(gameTab);

    expect(screen.getByTestId('report-list-view')).toHaveTextContent('Category: game');
  });
});
