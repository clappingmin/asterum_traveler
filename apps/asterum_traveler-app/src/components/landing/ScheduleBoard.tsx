import styled from 'styled-components';
import background from '../../assets/images/landing/scheduleBoard/background.png';
import boardIcon from '../../assets/images/landing/scheduleBoard/boardIcon.svg';
import { formatTime, getWeekDay, sortMembers, sortSchedule } from '../../shared/utils';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/landingService';
import { MEMBER_HEART } from '../../shared/constants';

const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.toLocaleString('en-US', { month: 'long' });

function ScheduleBoard() {
  const [dates, setDates] = useState<{ weekday: string; month: number; date: number }[]>([]);

  const { data: schedules } = useQuery({
    queryKey: ['schedules'],
    queryFn: api.getSchedulesAroundToday,
  });

  useEffect(() => {
    const newDates: { weekday: string; month: number; date: number }[] = [];

    const startDate = new Date(TODAY);
    startDate.setDate(TODAY.getDate() - 2);
    startDate.setHours(0, 0, 0, 0);

    Array.from({ length: 5 }, (_, i) => {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      day.setHours(0, 0, 0, 0);

      newDates.push({ weekday: getWeekDay(day), month: day.getMonth() + 1, date: day.getDate() });
    });

    setDates(newDates);
  }, []);

  const ScheduleTextBox = (date: number) => {
    const targetDaySchedules = schedules?.filter((schedule) => schedule.schedule_day === date);
    targetDaySchedules?.sort(sortSchedule);

    return (
      <>
        {targetDaySchedules?.map((schedule) => (
          <div key={schedule.id}>
            {sortMembers(schedule.members)
              .map((member) => MEMBER_HEART[member])
              .join('')}{' '}
            {!schedule.isAnniversary &&
              formatTime(schedule.schedule_hour, schedule.schedule_minute)}{' '}
            {schedule.content}
          </div>
        ))}
      </>
    );
  };

  return (
    <Wrapper background={background}>
      <MonthContainer>
        <Month>{MONTH}</Month>
        <Year>{YEAR}</Year>
      </MonthContainer>
      <ScheduleTable>
        <Dates>
          <tr>
            {dates.map((date) => (
              <th key={date.date}>
                {date.date} {date.weekday}.
              </th>
            ))}
          </tr>
        </Dates>
        <ScheduleBoxs>
          <tr>
            {dates.map((date) => (
              <th key={date.date}>{ScheduleTextBox(date.date)}</th>
            ))}
          </tr>
        </ScheduleBoxs>
        <BoardIcon src={boardIcon} />
      </ScheduleTable>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ background: string }>`
  width: 1700px;
  height: 1080px;
  margin: 0 110px;
  background: url(${(props) => props.background}) no-repeat center center;
  background-size: cover;
`;

const MonthContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: baseline;
  padding: 135px 48px 0 50px;
`;

const Month = styled.span`
  color: var(--schedule);
  font-family: 'PartialSansKR' !important;
  font-size: 180px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
`;
const Year = styled.span`
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: var(--schedule);
  font-family: 'PartialSansKR' !important;
  font-size: 64px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const ScheduleTable = styled.table`
  margin: 73px auto;
  width: 1600px;
  height: 420px;
  /* FIXME: Max-height 420이르 고정되게 수정 필요 */
  max-height: 420px;
  border-collapse: collapse;
  table-layout: fixed;
  position: relative;
`;

const Dates = styled.thead`
  border: 2px solid #fff;

  th {
    padding: 9px;
    border: 2px solid #fff;
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;

    &:nth-of-type(3) {
      background-color: var(--schedule);
    }
  }
`;

const ScheduleBoxs = styled.tbody`
  border: 2px solid #fff;

  th {
    border: 2px solid #fff;
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    padding: 16px;

    & > div {
      width: 100%;
      word-break: break-all;
      overflow-y: scroll;
      text-align: start;

      &:not(:last-of-type) {
        margin-bottom: 16px;
      }
    }
  }
`;

const BoardIcon = styled.img`
  right: 16.4px;
  bottom: 17px;
  height: 100px;
  position: absolute;
`;
export default ScheduleBoard;
