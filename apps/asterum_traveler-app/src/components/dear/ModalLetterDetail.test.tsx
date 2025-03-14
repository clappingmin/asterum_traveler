import { render, screen, waitFor } from '@testing-library/react';
import ModalLetterDetail from './ModalLetterDetail';
import { useMutation } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Timestamp } from 'firebase/firestore';
import { DearCard } from '@asterum/types';

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('@/shared/services/dearService', () => ({
  deleteDearCardByCardId: jest.fn(),
}));

jest.mock('@/main', () => ({
  queryClient: {
    invalidateQueries: jest.fn(),
  },
}));

jest.mock('@/shared/utils', () => ({
  showSuccessToast: jest.fn(),
  timestampToDisplayDate: jest.fn((timestamp: number) => `Formatted: ${timestamp}`),
}));

describe('ModalLetterDetail Component', () => {
  const mockCard: DearCard = {
    id: '-1',
    createdAt: Timestamp.now(),
    from: '박수민',
    password: 'test',
    content: '테스트 메시지',
    cardCoverColor: 'pink',
  };

  const onCloseMock = jest.fn();
  const deleteMutateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useMutation as jest.Mock).mockReturnValue({
      mutate: deleteMutateMock,
    });

    render(<ModalLetterDetail onClose={onCloseMock} dearCard={mockCard} />);
  });

  test('모달 내용이 제대로 렌더링 되어야 한다.', () => {
    expect(screen.getByText(mockCard.from)).toBeInTheDocument();
    expect(screen.getByText(`Formatted: ${mockCard.createdAt}`)).toBeInTheDocument();
    expect(screen.getByText(mockCard.content)).toBeInTheDocument();
  });

  test('닫기 버튼을 클릭하면 onClose가 호출되어야 한다.', async () => {
    const closeButton = screen.getAllByRole('button')[1];

    await userEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('삭제 버튼 클릭 시 비밀번호가 일치하면 삭제 mutation이 호출되어야 한다.', async () => {
    window.prompt = jest.fn().mockReturnValue(mockCard.password);

    const deleteButton = screen.getAllByRole('button')[0];
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteMutateMock).toHaveBeenCalled();
    });
  });

  test('삭제 버튼 클릭 시 비밀번호가 일치하지 않으면 경고창이 뜨고 삭제되지 않아야 한다.', async () => {
    window.prompt = jest.fn().mockReturnValue('wrong-password');
    window.alert = jest.fn();

    const deleteButton = screen.getAllByRole('button')[0];
    await userEvent.click(deleteButton);

    expect(window.alert).toHaveBeenCalledWith('비밀번호가 다릅니다.');
    expect(deleteMutateMock).not.toHaveBeenCalled();
  });
});
