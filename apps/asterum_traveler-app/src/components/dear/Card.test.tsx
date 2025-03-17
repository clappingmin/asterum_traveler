import { fireEvent, render, screen } from '@testing-library/react';
import { DearCard } from '@asterum/types';
import { Timestamp } from 'firebase/firestore';
import Card from './Card';
import { timestampToDisplayDate } from '@/shared/utils';

jest.mock('@/assets/images/report/card_pink.png', () => 'pink.png');
jest.mock('@/components/dear/ModalLetterDetail', () => ({ dearCard }: { dearCard: DearCard }) => (
  <div data-testid="card-modal">{dearCard.content}</div>
));

describe('Card Component', () => {
  const mockDearCard: DearCard = {
    id: '-1',
    createdAt: Timestamp.now(),
    from: '박수민',
    password: 'test',
    content: '테스트 메시지',
    cardCoverColor: 'pink',
  };

  beforeEach(() => {
    render(<Card dearCard={mockDearCard} />);
  });

  test('카드가 렌더링 되어야 한다', () => {
    expect(screen.getByText('박수민')).toBeInTheDocument();
    expect(screen.getByText(timestampToDisplayDate(mockDearCard.createdAt))).toBeInTheDocument();
    expect(screen.getByText('테스트 메시지')).toBeInTheDocument();
  });

  test('카버 이미지가 올바르게 표시되어야 한다', () => {
    const coverImg = screen.getByRole('img');
    expect(coverImg).toHaveAttribute('src', 'pink.png');
  });

  test('카드 클릭 시 모달이 열려야 한다', () => {
    const messageContainer = screen.getByText('테스트 메시지');

    fireEvent.click(messageContainer);

    expect(screen.getByTestId('card-modal')).toBeInTheDocument();
  });
});
