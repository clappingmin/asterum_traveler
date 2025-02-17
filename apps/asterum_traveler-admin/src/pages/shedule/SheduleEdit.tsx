import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function ScheduleEdit() {
  // TODO: 스케줄 수정하기
  // const { scheduleId } = useParams();

  return (
    <Wrapper>
      <Title>Edit Schedule</Title>
      <Container>
        <InputWrapper>
          <label htmlFor="scheduleDate">스케줄 날짜</label>
          <input id="scheduleDate" type="datetime-local" />
        </InputWrapper>
        <InputWrapper>
          <label>스케줄 내용</label>
          <input />
        </InputWrapper>
        <InputWrapper>
          <span>멤버</span>
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
        </InputWrapper>
      </Container>
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

export default ScheduleEdit;
