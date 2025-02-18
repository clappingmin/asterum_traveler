import { Member, ScheduleBase } from '@asterum/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import * as api from '../../shared/services/scheduleService';
import { queryClient } from '../../main';
import { localStringToTimestamp } from '../../shared/utils';

interface OutletContext {
  selectedDate: Date;
}

function ScheduleEdit() {
  // TODO: 스케줄 수정하기
  // const { scheduleId } = useParams();

  const navigate = useNavigate();
  const { selectedDate } = useOutletContext<OutletContext>();
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [members, setMembers] = useState<Member[]>([]);

  const addSchedule = useMutation({
    mutationFn: (schedule: ScheduleBase) => api.addSchedule(schedule),
    onSuccess: (scheduleId: string) => {
      queryClient.invalidateQueries({ queryKey: ['schedules', scheduleId] });
      alert('스케줄 추가 완료');
      navigate(-1);
      // FIXME: 날짜가 이전 날짜로 돌아감 ex) 18일 추가하면 17일 보여주는 페이지로 이동
    },
  });

  useEffect(() => {
    // 날짜 초기화
    selectedDate.setUTCHours(0, 0, 0, 0);
    const localISOString = selectedDate.toISOString().slice(0, 16);
    setScheduleDate(localISOString);
  }, [selectedDate]);

  /**
   * 멤버 선택 변경
   * @param {React.ChangeEvent<HTMLFormElement>} e
   */
  const changeSelectMember = (e: React.ChangeEvent<HTMLFormElement>) => {
    const selectedMember = e.target.value;

    setMembers((prevMembers) =>
      prevMembers.includes(selectedMember)
        ? prevMembers.filter((member: Member) => member !== selectedMember) // 제거
        : [...prevMembers, selectedMember]
    );
  };

  const saveSchedule = () => {
    const convertedDate = localStringToTimestamp(scheduleDate);

    const schedule: ScheduleBase = {
      scheduleDate: convertedDate,
      content,
      members,
    };

    addSchedule.mutate(schedule);
  };

  return (
    <Wrapper>
      <Title>Edit Schedule</Title>
      <Container>
        <InputWrapper>
          <label htmlFor="scheduleDate">스케줄 날짜</label>
          <input
            id="scheduleDate"
            type="datetime-local"
            value={scheduleDate}
            onChange={(e) => {
              setScheduleDate(e.target.value);
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="content">스케줄 내용</label>
          <input
            id="content"
            value={content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setContent(e.target.value);
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <span>멤버</span>
          <form onChange={(e: React.ChangeEvent<HTMLFormElement>) => changeSelectMember(e)}>
            <input type="checkbox" value={'yejun'} id="yejun" />
            <label htmlFor="yejun">예준</label>
            <input type="checkbox" value={'noah'} id="noah" />
            <label htmlFor="noah">노아</label>
            <input type="checkbox" value={'bamby'} id="bamby" />
            <label htmlFor="bamby">밤비</label>
            <input type="checkbox" value={'eunho'} id="eunho" />
            <label htmlFor="eunho">은호</label>
            <input type="checkbox" value={'hamin'} id="hamin" />
            <label htmlFor="hamin">하민</label>
          </form>
        </InputWrapper>
      </Container>
      <ConfirmButton onClick={saveSchedule}>Confirm</ConfirmButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  color: #000;
  padding: 10px;
`;

const Title = styled.span`
  font-size: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > span,
  & > label {
    font-size: 14px;
    font-weight: 500;
  }
`;

const ConfirmButton = styled.button`
  cursor: pointer;
  width: fit-content;
  margin-left: auto;
`;

export default ScheduleEdit;
