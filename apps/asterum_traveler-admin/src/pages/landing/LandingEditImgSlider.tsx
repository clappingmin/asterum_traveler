import styled from 'styled-components';
import LandingImgFileUploader from './LandingImgFileUploader';

function LandingEditImgSlider() {
  return (
    <Wrapper>
      <Container>
        <Title>이미지 추가</Title>
        <LandingImgFileUploader />
      </Container>
      <HorizontalLine />
      <Container>
        <Title>랜딩 이미지 관리</Title>
      </Container>
      <HorizontalLine />
      <Container>
        <Title>서버 이미지 관리</Title>
      </Container>
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

const Container = styled.div``;

const ImgPreviewContainer = styled.div`
  border: 1px solid var(--color);
  width: 500px;
  aspect-ratio: 1920/1080;
  cursor: pointer;

  & > label {
    display: inline-block;
    width: 100%;
    aspect-ratio: 1920/1080;
    cursor: pointer;

    & > img {
      width: inherit;
      aspect-ratio: 1920/1080;
      object-fit: fill;
    }
  }

  & > input {
    display: none;
  }
`;

const WarningText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 4px 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export default LandingEditImgSlider;
