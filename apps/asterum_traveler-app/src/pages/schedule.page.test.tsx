import { render, screen, fireEvent } from '@testing-library/react';
import SchedulePage from '@/pages/schedule.page';

jest.mock('@/components/schedule/ScheduleCalendar', () => ({ month }: { month: number }) => (
  <div data-testid="schedule-calendar">{`Month: ${month}`}</div>
));
jest.mock(
  '@/components/global/error/FetchErrorBoundary',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="fetch-error-boundary">{children}</div>
);

describe('SchedulePage', () => {
  test('SchedulePage 렌더링 테스트', () => {
    render(<SchedulePage />);

    expect(screen.getByText('SCHEDULE')).toBeInTheDocument();
    expect(screen.getByTestId('schedule-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('fetch-error-boundary')).toBeInTheDocument();

    for (let month = 1; month <= 12; month++) {
      expect(screen.getByText(month.toString())).toBeInTheDocument();
    }
  });

  test('월 선택 버튼 클릭 시 selectedMonth 상태가 변경되는지 확인', () => {
    render(<SchedulePage />);

    // 3월 버튼 클릭
    const marchButton = screen.getByText('3');
    fireEvent.click(marchButton);

    expect(screen.getByTestId('schedule-calendar')).toHaveTextContent('Month: 3');
  });
});
