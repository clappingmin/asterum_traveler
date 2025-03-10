import { useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import ImgSlider from './ImgSlider';
import { SliderImage } from '@asterum/types';

jest.mock('./CarouselImg', () => ({ image }: { image: SliderImage }) => (
  <img src={image.imageUrl} alt={image.imageUrl} data-testid={`carousel-image-${image.id}`} />
));
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('ImgSlider', () => {
  const mockImg: SliderImage[] = [
    { id: '-1', order: 0, imageUrl: '이미지 테스트 1' },
    { id: '0', order: 1, imageUrl: '이미지 테스트 2' },
  ];

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockImg,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<ImgSlider />);
  });

  test('실제 디스플레이 이미지가 모두 보여야 한다.', () => {
    mockImg.forEach((img) => {
      // infiniteLoop: true라서 중복된 이미지가 렌더링 됨
      const images = screen.getAllByTestId(`carousel-image-${img.id}`);
      expect(images.length).toBeGreaterThanOrEqual(1);

      expect(images[0]).toHaveAttribute('src', img.imageUrl);
      expect(images[0]).toHaveAttribute('alt', img.imageUrl);
    });
  });
});
