import styled from 'styled-components';

function SliderImgOverView() {
  return (
    <Wrapper>
      <ImgBox />
      <ImgBox />
      <ImgBox />
      <ImgBox />
      <ImgBox />
      <ImgBox />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;
const ImgBox = styled.img`
  border: 1px solid var(--color);
  width: 300px;
  aspect-ratio: 1920/1080;
`;

export default SliderImgOverView;
