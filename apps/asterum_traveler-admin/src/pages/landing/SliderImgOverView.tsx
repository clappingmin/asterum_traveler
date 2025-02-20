import { SliderImage } from '@asterum/types';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import * as api from '../../shared/services/landingService';

function SliderImgOverView() {
  const { data: images } = useQuery<SliderImage[]>({
    queryKey: ['slider-viewed'],
    queryFn: async () => {
      return await api.getViewdSliderImages();
    },
  });

  return (
    <Wrapper>
      {images?.map((image) => (
        <ImgBox src={image.imageUrl} key={image.id} alt={image.id} />
      ))}
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
  width: 300px;
  aspect-ratio: 1920/1080;
  border-radius: 10px;
`;

export default SliderImgOverView;
