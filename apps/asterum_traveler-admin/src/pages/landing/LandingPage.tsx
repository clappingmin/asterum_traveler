import styled from 'styled-components';
import DiscographyOverView from './DiscographyOverView';
import SliderImgOverView from './SliderImgOverView';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <Wrapper>
      <div>
        <TopBar>
          <span>이미지 슬라이더 관리</span>
          <NavBtn to="edit/img-slider">
            <EditIcon />
          </NavBtn>
        </TopBar>
        <SliderImgOverView />
      </div>
      <HorizontalLine />
      <div>
        <TopBar>
          <span>디스코그래피 관리</span>
          <NavBtn to="">
            <EditIcon />
          </NavBtn>
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

const NavBtn = styled(Link)`
  background-color: var(--color);
  border-radius: 10px;
  padding: 4px 8px;
`;

export default LandingPage;
