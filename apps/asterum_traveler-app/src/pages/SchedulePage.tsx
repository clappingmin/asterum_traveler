import styled from 'styled-components';
import scheduleBambyImg from '../assets/images/member/schedule_bamby.png';

function SchedulePage() {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>SCHEDULE</Title>
        <Bamby width={647} height={562} src={scheduleBambyImg} />
      </TitleContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: var(--width);
  margin: var(--header-height) auto 0;
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

export default SchedulePage;
