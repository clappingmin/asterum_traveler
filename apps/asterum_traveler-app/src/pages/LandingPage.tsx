import styled from 'styled-components';
import ImgSlider from '../components/landing/ImgSlider';
import DearWall from '../components/landing/DearWall';
import ScheduleBoard from '../components/landing/ScheduleBoard';
import DiscographyBoard from '../components/landing/DiscographyBoard';
import BackgroundImg from '../assets/images/landing/background.png';

function LandingPage() {
  return (
    <Wrapper background={BackgroundImg}>
      <ImgSlider />
      <DearWall />
      <ScheduleBoard />
      <DiscographyBoard />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ background: string }>`
  width: 1920px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 128px;
  background: url(${(props) => props.background}) no-repeat center center;
  background-size: cover;
`;

export default LandingPage;
