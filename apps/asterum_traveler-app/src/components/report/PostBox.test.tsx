import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostBox from './PostBox';
import { Report } from '@asterum/types';
import { mockReportImageData } from '../../shared/mocks';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PostBox', () => {
  const mockReport: Report = mockReportImageData;

  test('리포트 이미지가 보여야 한다.', () => {
    render(
      <MemoryRouter>
        <PostBox report={mockReport} />
      </MemoryRouter>
    );

    const image = screen.getByAltText('리포트 이미지');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockReport.reportThumbnail);
  });

  test('클릭하면 제품 상세페이지로 이동해야 한다.', () => {
    render(
      <MemoryRouter>
        <PostBox report={mockReport} />
      </MemoryRouter>
    );

    const wrapper = screen.getByRole('img', { name: '리포트 이미지' }).closest('div');
    fireEvent.click(wrapper!);

    expect(mockNavigate).toHaveBeenCalledWith(`${mockReport.reportType}/${mockReport.id}`);
  });
});
