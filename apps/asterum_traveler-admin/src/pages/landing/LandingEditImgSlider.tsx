import { useRef, useState } from 'react';
import styled from 'styled-components';
import * as api from '../../shared/services/landingService';
import { v4 as uuidv4 } from 'uuid';

function LandingEditImgSlider() {
  const [preview, setPreview] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // 이미지 재업로드 막기 위해서
  const beforeImageId = useRef<string>('');
  const imageId = useRef<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(file);
      const id = uuidv4();
      imageId.current = id;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreviewUrl(reader.result as string);
    }
  };

  const uploadSliderImage = async () => {
    if (!preview) return;
    if (!imageId.current || imageId.current === beforeImageId.current) {
      alert('이미 업로드 완료한 이미지 혹은 잘못된 이미지입니다.');
      return;
    }

    const uploadedImageUrl = await api.imageUpload(preview, imageId.current, 'slider');

    if (uploadedImageUrl) beforeImageId.current = imageId.current;
  };

  return (
    <Wrapper>
      <Container>
        <Title>이미지 추가</Title>
        <ImgPreviewContainer>
          <label htmlFor="preview">{previewUrl && <img src={previewUrl} />}</label>
          <input type="file" accept="image/*" id="preview" onChange={handleImageChange} />
        </ImgPreviewContainer>
        <ButtonContainer>
          <WarningText>이미지는 1920*1080 비율에 맞게 조정됩니다.</WarningText>
          <Button onClick={uploadSliderImage}>추가하기</Button>
        </ButtonContainer>
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
