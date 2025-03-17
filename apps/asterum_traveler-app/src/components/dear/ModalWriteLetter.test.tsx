import { render, screen, waitFor } from '@testing-library/react';
import ModalWriteLetter from './ModalWriteLetter';
import userEvent from '@testing-library/user-event';

const mockOnClose = jest.fn();
const mockMutate = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(() => ({
    mutate: mockMutate,
  })),
}));

jest.mock('@/main', () => ({
  queryClient: jest.fn(),
}));

describe('ModalWriteLetter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('모달이 정상적으로 렌더링된다.', () => {
    render(<ModalWriteLetter onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText('From')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Dear,')).toBeInTheDocument();
  });

  test('입력값이 제대로 반영된다.', async () => {
    render(<ModalWriteLetter onClose={mockOnClose} />);

    const fromInput = screen.getByPlaceholderText('From');
    const passwordInput = screen.getByPlaceholderText('Password');
    const contentTextarea = screen.getByPlaceholderText('Dear,');

    await userEvent.type(fromInput, 'John Doe');
    await userEvent.type(passwordInput, '1234');
    await userEvent.type(contentTextarea, 'Hello, this is a test letter!');

    expect(fromInput).toHaveValue('John Doe');
    expect(passwordInput).toHaveValue('1234');
    expect(contentTextarea).toHaveValue('Hello, this is a test letter!');
  });

  test('카드 색상을 선택할 수 있다.', async () => {
    render(<ModalWriteLetter onClose={mockOnClose} />);

    const colorBoxes = screen.getAllByRole('img');

    await userEvent.click(colorBoxes[0]);
    expect(colorBoxes[0]).toBeInTheDocument();
  });

  test('빈 값으로 저장을 시도하면 애니메이션이 실행된다.', async () => {
    render(<ModalWriteLetter onClose={mockOnClose} />);

    const writeButton = screen.getByTestId('writeButton');

    await userEvent.click(writeButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('From').parentElement).toHaveClass('warning');
      expect(screen.getByPlaceholderText('Password').parentElement).toHaveClass('warning');
      expect(screen.getByPlaceholderText('Dear,').parentElement).toHaveClass('warning');
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  test('모든 값이 입력되었을 때 카드가 정상적으로 저장된다.', async () => {
    render(<ModalWriteLetter onClose={mockOnClose} />);

    const fromInput = screen.getByPlaceholderText('From');
    const passwordInput = screen.getByPlaceholderText('Password');
    const contentTextarea = screen.getByPlaceholderText('Dear,');
    const pinkColor = screen.getByTestId('cover-color-pink');

    const writeButton = screen.getByTestId('writeButton');

    await userEvent.type(fromInput, '박수민');
    await userEvent.type(passwordInput, '1234');
    await userEvent.type(contentTextarea, 'Hello, Asterum test');
    await userEvent.click(pinkColor);
    await userEvent.click(writeButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        from: '박수민',
        password: '1234',
        content: 'Hello, Asterum test',
        cardCoverColor: 'pink',
      });
    });
  });

  test('닫기 버튼을 누르면 onClose가 호출된다.', async () => {
    render(<ModalWriteLetter onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button');
    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
