import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from '@/pages/_error.page';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NotFoundPage', () => {
  test('NotFoundPage 렌더링 테스트', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('요청하신 페이지를 찾을 수 없습니다.')).toBeInTheDocument();
    expect(screen.getByText('홈으로 돌아가기')).toBeInTheDocument();
  });

  test('홈으로 돌아가기 버튼을 클릭하면 navigate("/")가 호출되는지 확인', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const homeButton = screen.getByText('홈으로 돌아가기');
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
