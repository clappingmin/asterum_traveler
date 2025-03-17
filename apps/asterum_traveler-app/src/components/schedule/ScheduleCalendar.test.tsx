import { useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import ScheduleCalendar from './ScheduleCalendar';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@/shared/services/scheduleService', () => jest.fn());
jest.mock('@/components/global/LoadingDim', () => () => <div data-testid="loading-dim"></div>);

describe('ScheduleCalendar', () => {
  let setState: unknown;
  beforeEach(() => {
    setState = jest.fn();

    (useState as jest.Mock).mockImplementation((init) => [init, setState]);
  });

  test('로딩 중인 경우 LoadingDim을 렌더링 해야한나다', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<ScheduleCalendar month={3} />);

    expect(screen.getByTestId('loading-dim')).toBeInTheDocument();
  });

  test('props로 받은 month에 맞는 startDate로 변경되어야 한다', () => {
    const YEAR = new Date().getFullYear();
    const month = 3;

    render(<ScheduleCalendar month={month} />);

    expect(setState).toHaveBeenCalledWith(new Date(YEAR, month - 1, 1));
  });

  test('요일이 형식에 맞게 보여야 한다.', () => {
    render(<ScheduleCalendar month={12} />);

    const weekdays = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
    weekdays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  describe('해당 날짜의 스케줄이 보여야 한다.', () => {
    const TODAY = new Date();
    const MONTH = TODAY.getMonth() + 1;
    const DAY = TODAY.getDate();

    test('스케줄이 없는 날에 아무것도 없어야 한다', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
      });

      render(<ScheduleCalendar month={MONTH} />);

      expect(screen.getByTestId(`schedule-${MONTH}-${DAY}`)).toBeEmptyDOMElement();
    });

    test('스케줄이 있는 날 스케줄이 해당 날짜에 추가 되어야 한다', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: [
          {
            id: '-1',
            createdAt: Timestamp.now(),
            content: '스케줄 테스트 라디오 방송',
            members: ['bamby', 'eunho'],
            isAnniversary: false,
            scheduleDate: Timestamp.now(),
            schedule_year: TODAY.getFullYear(),
            schedule_month: TODAY.getMonth() + 1,
            schedule_day: TODAY.getDate(),
            schedule_hour: 1,
            schedule_minute: 0,
          },
        ],
        isLoading: false,
        isError: false,
      });

      render(<ScheduleCalendar month={MONTH} />);

      const scheduleElement = screen.getByTestId(`schedule-${MONTH}-${DAY}`);

      expect(scheduleElement).not.toBeEmptyDOMElement();
      expect(scheduleElement).toHaveTextContent('스케줄 테스트 라디오 방송');
    });

    test('기념일 스케줄이 해당 날짜에 올바른 형식으로 보여야 한다.', () => {
      (useQuery as jest.Mock).mockReturnValue({
        data: [
          {
            id: '-1',
            createdAt: Timestamp.now(),
            content: '기념일 테스트',
            members: ['bamby'],
            isAnniversary: true,
            scheduleDate: Timestamp.now(),
            schedule_year: 1997,
            schedule_month: TODAY.getMonth() + 1,
            schedule_day: TODAY.getDate(),
            schedule_hour: 1,
            schedule_minute: 0,
          },
        ],
        isLoading: false,
        isError: false,
      });

      render(<ScheduleCalendar month={MONTH} />);

      const scheduleElement = screen.getByTestId(`schedule-${MONTH}-${DAY}`);

      expect(scheduleElement).not.toBeEmptyDOMElement();
      expect(scheduleElement).toHaveTextContent('🥳 💗 기념일 테스트');
    });
  });
});
