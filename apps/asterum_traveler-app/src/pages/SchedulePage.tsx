import styled from 'styled-components';
import scheduleBambyImg from '../assets/images/member/schedule_bamby.png';
import Calendar from 'react-calendar';
import '../styles/react-calendar.css';
import { useState } from 'react';

function SchedulePage() {
  const TEMP_SHDDULE = [
    '8PM 은호 밤비 유투브 어쩌구 저쩌구 fdsafdsdfdsafdsfdsfadsaf 은호 밤비 유투브 어쩌구 저쩌구',
    '8PM 은호 밤비 유투브 어쩌구 저쩌구 fdsafdsdfdsafdsfdsfadsaf 은호 밤비 유투브 어쩌구 저쩌구',
    '8PM 은호 밤비 유투브 어쩌구 저쩌구 fdsafdsdfdsafdsfdsfadsaf 은호 밤비 유투브 어쩌구 저쩌구',
    ,
  ];

  const TODAY = new Date();
  const YEAR = TODAY.getFullYear();

  const [selectedMonth, _setSelectedMonth] = useState(TODAY.getMonth() + 1);

  // 요일에 마침표 추가
  const formatWeekday = (locale: string | undefined, date: Date) => {
    const weekday = date.toLocaleDateString(locale, { weekday: 'short' });
    return `${weekday}..`;
  };

  const renderSchedule = () => {
    return (
      <DayScheduleBox>
        {TEMP_SHDDULE.map((schedule, index) => (
          <ScheduleText className="text-overflow-3" key={index}>
            {schedule}
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
          <Month key={index + 1} isSelected={selectedMonth === index + 1}>
            {index + 1}
          </Month>
        ))}
      </MonthContainer>
      <HorizontalLine />
      <CalendarWrapper>
        <Calendar
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
  padding: 64px 0;
`;

const Title = styled.div`
  color: var(--schedule);
  font-family: 'PartialSansKR' !important;
  font-size: 200px;
  font-weight: 400;
  line-height: 120%;
`;

const Bamby = styled.img`
  position: absolute;
  bottom: -64px;
  left: 1132px;
  width: 647px;
  height: 562px;
`;

const MonthContainer = styled.div`
  width: var(--width);
  margin: 0 auto 16px;
  display: flex;
  gap: 32px;
`;

const Year = styled.div`
  color: var(--schedule);
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
`;

interface MonthProps {
  isSelected?: boolean;
}

const Month = styled.div<MonthProps>`
  cursor: pointer;
  color: ${(props) => (props.isSelected ? 'var(--schedule)' : 'var(--gray)')};
  font-size: 32px;
  font-weight: ${(props) => (props.isSelected ? 700 : 400)};
  line-height: 48px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 0;
  border: 1px solid #fff;
`;

const CalendarWrapper = styled.div`
  width: var(--width);
  margin: auto;
  padding-top: 32px;
`;

const DayScheduleBox = styled.div`
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScheduleText = styled.div`
  color: var(--color);
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export default SchedulePage;
