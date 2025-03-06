import { render, screen, fireEvent } from '@testing-library/react';
import SchedulePage from './SchedulePage';
import { MemoryRouter } from 'react-router-dom';

// Mock Components
jest.mock('../components/schedule/ScheduleCalendar', () => ({ month }: { month: number }) => (
  <div data-testid="schedule-calendar">{`Month: ${month}`}</div>
));
jest.mock(
  '../components/global/error/FetchErrorBoundary',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="fetch-error-boundary">{children}</div>
);

describe('SchedulePage', () => {
  test('SchedulePage 렌더링 테스트', () => {
    render(<SchedulePage />);

    // 주요 UI 요소가 존재하는지 확인
    expect(screen.getByText('SCHEDULE')).toBeInTheDocument();
    expect(screen.getByTestId('schedule-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('fetch-error-boundary')).toBeInTheDocument();

    // 12개월 버튼이 존재하는지 확인
    for (let month = 1; month <= 12; month++) {
      expect(screen.getByText(month.toString())).toBeInTheDocument();
    }
  });

  test('월 선택 버튼 클릭 시 selectedMonth 상태가 변경되는지 확인', () => {
    render(
      <MemoryRouter>
        <SchedulePage />
      </MemoryRouter>
    );

    // 3월 버튼 클릭
    const marchButton = screen.getByText('3');
    fireEvent.click(marchButton);

    // ScheduleCalendar에 전달된 월이 3월인지 확인
    expect(screen.getByTestId('schedule-calendar')).toHaveTextContent('Month: 3');
  });
});
