import { useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import ScheduleCalendar from './ScheduleCalendar';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));
// jest.mock('../../shared/services/scheduleService', jest.fn());
jest.mock('../global/LoadingDim', () => () => <div data-testid="loadind-dim"></div>);

describe('ScheduleCalendar', () => {
  test('로딩 중인 경우 LoadingDim을 렌더링 해야한나다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<ScheduleCalendar month={3} />);

    expect(screen.getByTestId('loading-dim')).toBeInTheDocument();
  });

  // test('props로 받은 month에 맞는 startDate로 변경되어야 한다', () => {});

  // test('요일이 형식에 맞게 보여야 한다.', () => {});

  // test('스케줄이 없는 날에 아무것도 없어야 한다', () => {});

  // test('스케줄이 있는 날 스케줄이 해당 날짜에 추가 되어야 한다', () => {});

  // test('기념일 스케줄이 해당 날짜에 올바른 형식으로 보여야 한다.', () => {});
});
