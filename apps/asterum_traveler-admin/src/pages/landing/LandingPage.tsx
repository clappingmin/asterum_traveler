import styled from 'styled-components';
import DiscographyOverView from './DiscographyOverView';
import SliderImgOverView from './SliderImgOverView';
import EditIcon from '@mui/icons-material/Edit';

function LandingPage() {
  return (
    <Wrapper>
      <div>
        <TopBar>
          <span>이미지 슬라이더 관리</span>
          <button>
            <EditIcon />
          </button>
        </TopBar>
        <SliderImgOverView />
      </div>
      <HorizontalLine />
      <div>
        <TopBar>
          <span>디스코그래피 관리</span>
          <button>
            <EditIcon />
          </button>
        </TopBar>
        <DiscographyOverView />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fff;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & > span {
    font-size: 30px;
  }
`;

export default LandingPage;
