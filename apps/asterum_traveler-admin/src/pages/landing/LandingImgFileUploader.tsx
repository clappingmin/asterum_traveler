import { useRef, useState } from 'react';
import styled from 'styled-components';
import * as api from '../../shared/services/landingService';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../main';

function LandingImgFileUploader() {
  const [preview, setPreview] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const addSliderImage = useMutation({
    mutationFn: ({ preview, imageId, type }: { preview: File; imageId: string; type: 'slider' }) =>
      api.imageUpload(preview, imageId, type),
    onSuccess: (imageUrl) => {
      queryClient.invalidateQueries({ queryKey: ['slider', imageUrl] });
      beforeImageId.current = imageId.current;
      alert('이미지 업로드 완료');
    },
  });

  // 이미지 재업로드 막기 위해서
  // NOTE: 생각해보니 ref를 두개 안만들고 file를 비교하면 되는거 아님? Id도 서비스에서 호출하고
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

    addSliderImage.mutate({ preview, imageId: imageId.current, type: 'slider' });
  };

  return (
    <>
      <ImgPreviewContainer>
        <label htmlFor="preview">{previewUrl && <img src={previewUrl} />}</label>
        <input type="file" accept="image/*" id="preview" onChange={handleImageChange} />
      </ImgPreviewContainer>
      <ButtonContainer>
        <WarningText>이미지는 1920*1080 비율에 맞게 조정됩니다.</WarningText>
        <Button onClick={uploadSliderImage}>추가하기</Button>
      </ButtonContainer>
    </>
  );
}

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

const Button = styled.button`
  padding: 4px 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
export default LandingImgFileUploader;
