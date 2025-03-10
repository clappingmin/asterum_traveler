import { render, screen } from '@testing-library/react';
import CarouselImg from './CarouselImg';
import { SliderImage } from '@asterum/types';

describe('CarouselImg', () => {
  const mockCarouselImg: SliderImage = {
    id: '-1',
    order: -1,
    imageUrl: '테스트 이미지 주소',
  };

  test('CarouselImg 렌더링 테스트', () => {
    render(<CarouselImg image={mockCarouselImg} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('src')).toEqual('테스트 이미지 주소');
  });
});
