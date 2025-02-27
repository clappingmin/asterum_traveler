import { SliderImage } from '@asterum/types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

interface CarouselImgProps {
  image: SliderImage;
}
function CarouselImg({ image }: CarouselImgProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Imgae
      src={image.imageUrl}
      width={1920}
      height={1080}
      alt="플레이브 이미지"
      onLoad={() => {
        setLoaded(true);
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.7 }}
    />
  );
}

const Imgae = styled(motion.img)`
  width: 1920px;
  height: 1080px;
  object-fit: cover;
`;

export default CarouselImg;
