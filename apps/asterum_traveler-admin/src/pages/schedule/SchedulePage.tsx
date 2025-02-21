import styled from 'styled-components';
import Calendar from 'react-calendar';
import { useState } from 'react';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/scheduleService';
import { Schedule } from '@asterum/types';

const TODAY = new Date();

function SchedulePage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | any>(TODAY);

  const { data: schedules } = useQuery({
    queryKey: ['schedules', selectedDate],
    queryFn: async () => {
      return await api.getSchedulesByDate(selectedDate);
    },
  });

  const goToScheduleEdit = (scheduleId?: string) => {
    scheduleId ? navigate(`edit/${scheduleId}`) : navigate('edit');
  };

  return (
    <Wrapper>
      <Calendar
        defaultActiveStartDate={TODAY}
        defaultValue={TODAY}
        defaultView="month"
        onChange={setSelectedDate}
        value={selectedDate}
        locale="en-US"
      />

      <DayListWrapper>
        <ScheduleTopWrapper>
          <SelctedDate>{`
          ${selectedDate.getFullYear()}년
          ${selectedDate.getMonth() + 1}월
          ${selectedDate.getDate()}일
        `}</SelctedDate>
          <ScheduleAddButton
            onClick={() => {
              goToScheduleEdit();
            }}
          >
            ADD SCHEDULE
          </ScheduleAddButton>
        </ScheduleTopWrapper>
        <HorizontalLine />
        {/* Schedule Edit Component */}
        <Outlet context={{ selectedDate }} />
        <ScheduleListWrapper>
          {schedules &&
            schedules.map((schedule: Schedule) => (
              <ScheduleContainer>
                <ScheduleContent>
                  <div>기념일 {schedule.isAnniversary ? 'Y' : 'N'}</div>
                  <div>{`${schedule.schedule_hour}:${schedule.schedule_minute}`}</div>
                  <div>{schedule.members.join(', ')}</div>
                  <div>{schedule.content}</div>
                </ScheduleContent>
                <ScheduleEditButton
                  onClick={() => {
                    goToScheduleEdit(schedule.id);
                  }}
                >
                  <EditSharpIcon fontSize="small" />
                </ScheduleEditButton>
              </ScheduleContainer>
            ))}
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
  cursor: pointer;
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
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 18px;
`;

const ScheduleEditButton = styled.button`
  aspect-ratio: 1;
  border-radius: 10px;
  cursor: pointer;
`;

export default SchedulePage;
