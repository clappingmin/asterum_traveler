import styled from 'styled-components';
import background from '../../assets/images/landing/scheduleBoard/background.png';
import boardIcon from '../../assets/images/landing/scheduleBoard/boardIcon.svg';

function ScheduleBoard() {
  return (
    <Wrapper background={background}>
      <MonthContainer>
        <Month>September</Month>
        <Year>2025</Year>
      </MonthContainer>
      <ScheduleTable>
        <Dates>
          <tr>
            <th>15 Sat.</th>
            <th>15 Sat.</th>
            <th>15 Sat.</th>
            <th>15 Sat.</th>
            <th>15 Sat.</th>
          </tr>
        </Dates>
        <ScheduleBoxs>
          <tr>
            <th>
              <div>
                <div>❤️💗 8PM 유투브 어쩌구 저쩌구 라이브</div>
                <div>❤️💗 8PM 유투브 어쩌구 저쩌구 라이브</div>
                <div>❤️💗 8PM 유투브 어쩌구 저쩌구 라이브</div>
                <div>❤️💗 8PM 유투브 어쩌구 저쩌구 라이브</div>
              </div>
            </th>
            <th>
              <div>
                <div>❤️💗 8PM 유투브 어쩌구 저쩌구 라이브</div>
                <div>❤️💗 8PM 유투브 어쩌구 저쩌구 라이브</div>
                <div>❤️💗 8PM 유투브 어쩌구 저쩌구 라이브</div>
                <div>❤️💗 8PM 유투브 어쩌구 저쩌구 라이브</div>
              </div>
            </th>
            <th>
              <div>3</div>
            </th>
            <th>
              <div>4</div>
            </th>
            <th>
              <div>5</div>
            </th>
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

    & > div {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      text-align: start;
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
