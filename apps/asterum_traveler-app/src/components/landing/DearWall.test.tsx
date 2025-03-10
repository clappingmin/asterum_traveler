import { useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import DearWall from './DearWall';
import { DearCard } from '@asterum/types';
import { Timestamp } from 'firebase/firestore';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

describe('DearWall', () => {
  const mockDearCard: DearCard = {
    id: '1',
    createdAt: Timestamp.now(),
    from: '테스트 프롬',
    password: 'test',
    content: '테스트 본문 안녕 테스트!',
    cardCoverColor: 'pink',
  };

  test('받아온 카드 데이터가 보여야 한다.', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [mockDearCard],
    });

    render(<DearWall />);

    expect(screen.getByText(mockDearCard.content)).toBeInTheDocument();
  });
});
