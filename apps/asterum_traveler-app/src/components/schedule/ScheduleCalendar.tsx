import { Schedule } from '@asterum/types';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import * as api from '@/shared/services/scheduleService';
import { formatTime, sortMembers } from '@/shared/utils';
import { MEMBER_HEART, MEMBER_KOREAN_NAME } from '@/shared/constants';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingDim from '@/components/global/LoadingDim';

const TODAY = new Date();
const YEAR = TODAY.getFullYear();

interface ScheduleCalendarProps {
  month: number;
  onRefetch?: (fn: () => Promise<unknown>) => void;
}

function ScheduleCalendar({ month, onRefetch }: ScheduleCalendarProps) {
  const [startDate, setStartDate] = useState<Date>(TODAY);

  useEffect(() => {
    setStartDate(new Date(YEAR, month - 1, 1));
  }, [month]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['schedules', YEAR, startDate.getMonth() + 1],
    queryFn: async () => {
      return await api.getSchedulesByDate(startDate);
    },
    retry: false,
  });

  if (isError) throw error;

  useEffect(() => {
    if (onRefetch && refetch) onRefetch(() => refetch());
  }, [onRefetch, refetch]);

  // 요일에 마침표 추가
  const formatWeekday = (locale: string | undefined, date: Date) => {
    const weekday = date.toLocaleDateString(locale, { weekday: 'short' });
    return `${weekday}..`;
  };

  /**
   * 날짜에 맞게 스케줄 데이터 보여주기
   * @param date
   */
  const renderSchedule = ({ date }: any) => {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;

    const dateSchedules: Schedule[] =
      data?.filter(
        (schedule: Schedule) => schedule.schedule_day === day && schedule.schedule_month === month
      ) || [];

    return (
      <DayScheduleBox data-testid={`schedule-${month}-${day}`}>
        {dateSchedules.map((schedule) => (
          <ScheduleText className="text-overflow-3" key={schedule.id}>
            {schedule.isAnniversary
              ? '🥳'
              : formatTime(schedule.schedule_hour, schedule.schedule_minute)}{' '}
            {sortMembers(schedule.members)
              .map((member) =>
                schedule.isAnniversary ? MEMBER_HEART[member] : MEMBER_KOREAN_NAME[member]
              )
              .join(schedule.isAnniversary ? '' : ' ')}{' '}
            {schedule.content}
          </ScheduleText>
        ))}
      </DayScheduleBox>
    );
  };

  return (
    <>
      {isLoading && <LoadingDim />}
      <Calendar
        activeStartDate={startDate}
        defaultActiveStartDate={TODAY}
        defaultValue={TODAY}
        defaultView="month"
        maxDate={new Date(YEAR, 11, 31)}
        minDate={new Date(YEAR, 11, 31)}
        showNavigation={false}
        formatShortWeekday={formatWeekday}
        locale="en-US"
        tileContent={renderSchedule}
      />
    </>
  );
}

const DayScheduleBox = styled.div`
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ScheduleText = styled.div`
  color: var(--color);
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25rem;
`;

export default ScheduleCalendar;
