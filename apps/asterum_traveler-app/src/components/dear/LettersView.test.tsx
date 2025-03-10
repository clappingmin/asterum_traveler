import { render, screen, waitFor } from '@testing-library/react';
import LettersView from './LettersView';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DearCard } from '@asterum/types';
import userEvent from '@testing-library/user-event';
import { Timestamp } from 'firebase/firestore';

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock('./Card', () => ({ dearCard }: { dearCard: DearCard }) => (
  <div data-testid="card">{dearCard.content}</div>
));

jest.mock('../global/InfiniteScroll', () => ({ fetchFn }: any) => (
  <button onClick={fetchFn} data-testid="load-more">
    Load More
  </button>
));

jest.mock('../global/LoadingDim', () => () => <div data-testid="loading" />);

describe('LettersView Component', () => {
  const mockCards = [
    {
      id: '-1',
      createdAt: Timestamp.now(),
      from: '박수민',
      password: 'test',
      content: '테스트 메시지',
      cardCoverColor: 'pink',
    },
    {
      id: '-2',
      createdAt: Timestamp.now(),
      from: '박수민',
      password: 'test',
      content: '테스트 메시지 2',
      cardCoverColor: 'pink',
    },
  ];

  const mockQueryData = {
    data: { pages: [{ data: mockCards }] },
    isFetchingNextPage: false,
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn(),
  };

  beforeEach(() => {
    (useInfiniteQuery as jest.Mock).mockReturnValue(mockQueryData);
  });

  test('카드들이 정상적으로 렌더링 되어야 한다', () => {
    render(<LettersView />);
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockCards.length);
    mockCards.forEach((card) => {
      expect(screen.getByText(card.content)).toBeInTheDocument();
    });
  });

  test('로딩 중일 때 LoadingDim이 보여야 한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...mockQueryData,
      isLoading: true,
    });
    render(<LettersView />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('다음 페이지 로딩을 트리거해야 한다', async () => {
    render(<LettersView />);
    const loadMoreButton = screen.getByTestId('load-more');
    userEvent.click(loadMoreButton);
    await waitFor(() => {
      expect(mockQueryData.fetchNextPage).toHaveBeenCalled();
    });
  });

  test('오류가 발생하면 예외가 던져져야 한다', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      ...mockQueryData,
      isError: true,
      error: new Error('Test Error'),
    });
    expect(() => render(<LettersView />)).toThrow('Test Error');
  });
});
