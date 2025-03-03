import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import * as api from '../../shared/services/landingService';
import { useQuery } from '@tanstack/react-query';
import CarouselImg from './CarouselImg';

const SETTINGS = {
  autoPlay: true,
  infiniteLoop: true,
  interval: 3000,
  showArrows: false,
  showThumbs: false,
  showStatus: false,
  emulateTouch: false,
};

function ImgSlider() {
  const { data } = useQuery({ queryKey: ['slider'], queryFn: api.getViewdSliderImages });

  return (
    <Wrapper>
      <Carousel {...SETTINGS}>
        {data?.map((image) => (
          <CarouselImg key={image.id} image={image} />
        ))}
      </Carousel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 1920 / 1080;
  background-color: #000;
`;

export default ImgSlider;
