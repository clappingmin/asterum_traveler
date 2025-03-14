import { render, screen } from '@testing-library/react';
import ScheduleBoard from './ScheduleBoard';
import { useQuery } from '@tanstack/react-query';
import { Schedule } from '@asterum/types';
import { Timestamp } from 'firebase/firestore';
import { MEMBER_HEART, MEMBER_KOREAN_NAME } from '@/shared/constants';
import { formatTime } from '@/shared/utils';

// Mock API와 React Query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('ScheduleBoard', () => {
  const TODAY = new Date();

  const mockSchedules: Schedule[] = [
    {
      id: '1',
      createdAt: Timestamp.now(),
      content: '테스트 일정 1',
      members: ['bamby', 'eunho'],
      isAnniversary: false,
      scheduleDate: Timestamp.now(),
      schedule_year: TODAY.getFullYear(),
      schedule_month: TODAY.getMonth() + 1,
      schedule_day: TODAY.getDate(),
      schedule_hour: 14,
      schedule_minute: 30,
    },

    {
      id: '2',
      createdAt: Timestamp.now(),
      content: '테스트 일정 2',
      members: ['noah', 'hamin'],
      isAnniversary: false,
      scheduleDate: Timestamp.now(),
      schedule_year: TODAY.getFullYear(),
      schedule_month: TODAY.getMonth() + 1,
      schedule_day: TODAY.getDate(),
      schedule_hour: 14,
      schedule_minute: 30,
    },
  ];

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockSchedules,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<ScheduleBoard />);
  });

  test('월과 연도가 정상적으로 렌더링되어야 한다.', () => {
    const month = TODAY.toLocaleString('en-US', { month: 'long' });
    const year = TODAY.getFullYear();

    expect(screen.getByText(month)).toBeInTheDocument();
    expect(screen.getByText(year.toString())).toBeInTheDocument();
  });

  test('5일간의 날짜가 정상적으로 렌더링되어야 한다.', () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 2);

    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateText = `${date.getDate()} ${date.toLocaleDateString('en-US', {
        weekday: 'short',
      })}.`;

      expect(screen.getByText(dateText)).toBeInTheDocument();
    }
  });

  test('일정이 정상적으로 렌더링되어야 한다.', () => {
    mockSchedules.forEach((schedule) => {
      const memberNames = schedule.members.map((member) => MEMBER_KOREAN_NAME[member]).join(' ');
      const hearts = schedule.members.map((member) => MEMBER_HEART[member]).join('');
      const formattedTime = !schedule.isAnniversary
        ? `${formatTime(schedule.schedule_hour, schedule.schedule_minute)}`
        : '';

      const scheduleText = `${hearts} ${formattedTime} ${memberNames} ${schedule.content}`.trim();

      expect(screen.getByText(scheduleText)).toBeInTheDocument();
    });
  });
});
