import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import * as api from '../../shared/services/landingService';
import { useQuery } from '@tanstack/react-query';

function ImgSlider() {
  const { data } = useQuery({ queryKey: ['slider'], queryFn: api.getViewdSliderImages });

  const settings = {
    autoPlay: true,
    infiniteLoop: true,
    interval: 3000,
    showArrows: false,
    showThumbs: false,
    showStatus: false,
  };
  return (
    <Wrapper>
      <Carousel {...settings}>
        {data?.map((image) => (
          <Imgae src={image.imageUrl} />
        ))}
      </Carousel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 1920 / 1080;
  color: #fff;
`;

const Imgae = styled.img`
  width: 1920px;
  height: 1080px;
  object-fit: fill;
`;

export default ImgSlider;
