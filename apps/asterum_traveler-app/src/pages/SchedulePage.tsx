import styled from 'styled-components';
import scheduleBambyImg from '../assets/images/member/schedule_bamby.png';
import Calendar from 'react-calendar';
import '../styles/react-calendar.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../shared/services/scheduleService';
import { Schedule } from '@asterum/types';
import { MEMBER_HEART, MEMBER_KOREAN_NAME } from '../shared/constants';
import { formatTime, sortMembers } from '../shared/utils';

const TODAY = new Date();
const YEAR = TODAY.getFullYear();

function SchedulePage() {
  const [selectedMonth, setSelectedMonth] = useState(TODAY.getMonth() + 1);
  const [displayStartDate, setDisplayStartDate] = useState(TODAY);

  const { data } = useQuery({
    queryKey: ['schedules', YEAR, selectedMonth],
    queryFn: async () => {
      return await api.getSchedulesByDate(displayStartDate);
    },
  });

  const changeDisplayMonth = (month: number) => {
    console.log(month);
    setDisplayStartDate(new Date(YEAR, month - 1, 1));
    setSelectedMonth(month);
  };

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

    const dateSchedules: Schedule[] = data
      ? data?.filter(
          (schedule) => schedule.schedule_day === day && schedule.schedule_month === month
        )
      : [];

    return (
      <DayScheduleBox>
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
    <Wrapper>
      <TitleContainer>
        <Title>SCHEDULE</Title>
        <Bamby width={647} height={562} src={scheduleBambyImg} />
      </TitleContainer>
      <MonthContainer>
        <Year>2024</Year>
        {Array.from({ length: 12 }, (_, index) => (
          <Month
            key={index + 1}
            isSelected={selectedMonth === index + 1}
            onClick={() => {
              changeDisplayMonth(index + 1);
            }}
          >
            {index + 1}
          </Month>
        ))}
      </MonthContainer>
      <HorizontalLine />
      <CalendarWrapper>
        <Calendar
          activeStartDate={displayStartDate}
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
      </CalendarWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin: var(--header-height) auto;
`;

const TitleContainer = styled.div`
  position: relative;
  margin: auto;
  width: var(--width);
  padding: 4rem 0;
`;

const Title = styled.div`
  color: var(--schedule);
  font-family: 'PartialSansKR' !important;
  font-size: 12.5rem;
  font-weight: 400;
  line-height: 120%;
`;

const Bamby = styled.img`
  position: absolute;
  bottom: -4rem;
  left: 70.75rem;
  width: 40.4375rem;
  height: 35.125rem;
`;

const MonthContainer = styled.div`
  width: var(--width);
  margin: 0 auto 1rem;
  display: flex;
  gap: 2rem;
`;

const Year = styled.div`
  color: var(--schedule);
  font-size: 2rem;
  font-weight: 700;
  line-height: 3rem;
`;

interface MonthProps {
  isSelected?: boolean;
}

const Month = styled.div<MonthProps>`
  cursor: pointer;
  color: ${(props) => (props.isSelected ? 'var(--schedule)' : 'var(--gray)')};
  font-size: 2rem;
  font-weight: ${(props) => (props.isSelected ? 700 : 400)};
  line-height: 3rem;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 0;
  border: 0.0625rem solid #fff;
`;

const CalendarWrapper = styled.div`
  width: var(--width);
  margin: auto;
  padding-top: 2rem;
`;

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

export default SchedulePage;
