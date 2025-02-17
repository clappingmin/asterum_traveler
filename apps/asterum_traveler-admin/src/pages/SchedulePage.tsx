import styled from 'styled-components';
import Calendar from 'react-calendar';
import { useState } from 'react';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { Schedule } from '@asterum/types';

const TODAY = new Date();
const MOCK_SCHEDULE = {
  id: 1,
  content: '어쩌구 저쩌구~~~~~',
  member: ['yejun', 'bamby'],
  date: new Date(),
};

function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(TODAY);

  const changeDate = (date: Date | any) => {
    setSelectedDate(date);
  };

  return (
    <Wrapper>
      <CalendarWrapper>
        <Calendar
          defaultActiveStartDate={TODAY}
          defaultValue={TODAY}
          defaultView="month"
          onChange={changeDate}
          value={selectedDate}
          locale="en-US"
        />
      </CalendarWrapper>
      <DayListWrapper>
        <ScheduleTopWrapper>
          <SelctedDate>{`
          ${selectedDate.getFullYear()}년
          ${selectedDate.getMonth() + 1}월
          ${selectedDate.getDate()}일
        `}</SelctedDate>
          <ScheduleAddButton>ADD SCHEDULE</ScheduleAddButton>
        </ScheduleTopWrapper>
        <HorizontalLine />
        <ScheduleListWrapper>
          <ScheduleContainer>
            <ScheduleContent>
              8PM 은호 밤비 유투브 어쩌구 저쩌구 fdsafdsdfdsafdsfdsfadsaf 은호 밤비 유투브 어쩌구
              저쩌구
            </ScheduleContent>
            <ScheduleEditButton>
              <EditSharpIcon fontSize="small" />
            </ScheduleEditButton>
          </ScheduleContainer>
          <ScheduleContainer>
            <ScheduleContent>
              8PM 은호 밤비 유투브 어쩌구 저쩌구 fdsafdsdfdsafdsfdsfadsaf 은호 밤비 유투브 어쩌구
              저쩌구
            </ScheduleContent>
            <ScheduleEditButton>
              <EditSharpIcon fontSize="small" />
            </ScheduleEditButton>
          </ScheduleContainer>
        </ScheduleListWrapper>
      </DayListWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CalendarWrapper = styled.div``;

const DayListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ScheduleTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const ScheduleAddButton = styled.button`
  height: 30px;
`;

const SelctedDate = styled.span`
  font-size: 30px;
  margin-bottom: 20px;
`;

const ScheduleListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const HorizontalLine = styled.div`
  background-color: #fff;
  width: 100%;
  height: 1px;
`;

const ScheduleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScheduleContent = styled.div`
  font-size: 16px;
`;

const ScheduleEditButton = styled.button`
  aspect-ratio: 1;
  border-radius: 10px;
`;

export default SchedulePage;
