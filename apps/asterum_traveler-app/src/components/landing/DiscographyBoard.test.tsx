import { render, screen } from '@testing-library/react';
import DiscographyBoard from './DiscographyBoard';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

describe('DiscographyBoard', () => {
  const mockDiscography = [
    {
      id: '-1',
      albumName: '앨범명 테스트',
      releaseDate: '2022.08.01',
      imageUrl: '테스트 이미지',
    },
    {
      id: '-2',
      albumName: '엄청 길고 긴 앨범명 테스트 test test test',
      releaseDate: '2022.08.01',
      imageUrl: '테스트 이미지',
    },
  ];

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockDiscography,
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<DiscographyBoard />);
  });

  test('디스코그래피 이미지가 보여야 한다', () => {
    mockDiscography.forEach((mock) => {
      const albumImg = screen.getByAltText(mock.albumName);
      expect(albumImg).toBeInTheDocument();
    });
  });
  test('앨범명 길이가 10을 넘을 경우 font-size가 작아야 한다.', () => {
    mockDiscography.forEach((mock) => {
      const albumNameEl = screen.getByText(mock.albumName);

      const expectedFontSize = mock.albumName.length > 10 ? '40px' : '44px';
      const computedStyle = window.getComputedStyle(albumNameEl);

      expect(computedStyle.fontSize).toBe(expectedFontSize);
    });
  });
});
