import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WriteLetterButton from './WriteLetterButton';

jest.mock('./ModalWriteLetter', () => ({ onClose }: { onClose: () => void }) => (
  <div data-testid="modal-write-letter">
    <button onClick={onClose}>Close Modal</button>
    <p>Dear,</p>
  </div>
));

jest.mock('../../assets/images/dear/pencil.png', () => 'pencil.png');

describe('WriteLetterButton', () => {
  test('연필 이미지가 화면에 렌더링된다.', () => {
    render(<WriteLetterButton />);

    const pencilImg = screen.getByRole('img');
    expect(pencilImg).toBeInTheDocument();
    expect(pencilImg).toHaveAttribute('src', expect.stringContaining('pencil.png'));
  });

  test('연필 이미지를 클릭하면 모달이 열린다.', async () => {
    render(<WriteLetterButton />);

    const pencilImg = screen.getByRole('img');
    await userEvent.click(pencilImg);

    const modal = await screen.findByTestId('modal-write-letter');
    expect(modal).toBeInTheDocument();

    const modalText = await screen.findByText('Dear,');
    expect(modalText).toBeInTheDocument();
  });

  test('모달 닫기 버튼을 클릭하면 모달이 닫힌다.', async () => {
    render(<WriteLetterButton />);

    const pencilImg = screen.getByRole('img');
    await userEvent.click(pencilImg);

    const closeButton = await screen.findByText('Close Modal');
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('modal-write-letter')).not.toBeInTheDocument();
    });
  });
});
