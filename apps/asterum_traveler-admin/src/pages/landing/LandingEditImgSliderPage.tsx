import styled from 'styled-components';
import LandingImgFileUploader from './LandingImgFileUploader';
import ManageSliderImage from './ManageSliderImage';

function LandingEditImgSliderPage() {
  return (
    <Wrapper>
      <div>
        <Title>이미지 추가</Title>
        <LandingImgFileUploader />
      </div>
      <HorizontalLine />
      <div>
        <ManageSliderImage />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color);
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export default LandingEditImgSliderPage;
