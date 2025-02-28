import styled from 'styled-components';
import scheduleBambyImg from '../assets/images/member/schedule_bamby.png';
import '../styles/react-calendar.css';
import { useState } from 'react';
import ScheduleCalendar from '../components/schedule/ScheduleCalendar';
import FetchErrorBoundary from '../components/global/error/FetchErrorBoundary';

const TODAY = new Date();
const YEAR = TODAY.getFullYear();

function SchedulePage() {
  const [selectedMonth, setSelectedMonth] = useState(TODAY.getMonth() + 1);
  const [refetchFn, setRefetchFn] = useState<(() => Promise<any>) | null>(null);

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Title>SCHEDULE</Title>
          <Bamby width={647} height={562} src={scheduleBambyImg} />
        </TitleContainer>
        <MonthContainer>
          <Year>{YEAR}</Year>
          {Array.from({ length: 12 }, (_, index) => (
            <Month
              key={index + 1}
              isSelected={selectedMonth === index + 1}
              onClick={() => {
                setSelectedMonth(index + 1);
              }}
            >
              {index + 1}
            </Month>
          ))}
        </MonthContainer>
        <HorizontalLine />
        <CalendarWrapper>
          <FetchErrorBoundary onRetry={() => refetchFn && refetchFn()}>
            <ScheduleCalendar month={selectedMonth} onRefetch={setRefetchFn} />
          </FetchErrorBoundary>
        </CalendarWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin: var(--header-height) auto;
  user-select: none;
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

export default SchedulePage;
