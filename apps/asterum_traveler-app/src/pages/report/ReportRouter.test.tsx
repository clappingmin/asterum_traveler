import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ReportRouter from './ReportRouter';
import { useQuery } from '@tanstack/react-query';
import { mockReportImageData, mockReportLiveData } from '../../shared/mocks';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('../../shared/services/reportService', () => jest.fn());
jest.mock('./ReportImagePage', () => () => <div data-testid="report-image-page" />);
jest.mock('./ReportLivePage', () => () => <div data-testid="report-live-page" />);
jest.mock('../NotFoundPage', () => () => <div data-testid="not-found-page" />);
jest.mock('../../components/global/LoadingDim', () => () => <div data-testid="loading-dim" />);

describe('ReportRouter', () => {
  test('페이지 타입, 페이지 아이디가 없는 경우', () => {
    render(
      <MemoryRouter initialEntries={['/report']}>
        <Routes>
          <Route path="/report" element={<ReportRouter />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  test('페이지 타입이 잘못된 경우', () => {
    render(
      <MemoryRouter initialEntries={['/report/invalid/1']}>
        <Routes>
          <Route path="/report/:pageType/:pageId" element={<ReportRouter />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  test('로딩 중인 경우 LoadingDim을 렌더링해야 함', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/report/image/1']}>
        <Routes>
          <Route path="/report/:pageType/:pageId" element={<ReportRouter />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading-dim')).toBeInTheDocument();
  });

  test('data가 없는 경우 NotFoundPage를 렌더링해야 함', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/report/image/1']}>
        <Routes>
          <Route path="/report/:pageType/:pageId" element={<ReportRouter />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  test('에러가 발생한 경우 예외를 던져야 함', () => {
    const mockError = new Error('Failed to fetch');
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: mockError,
    });

    expect(() =>
      render(
        <MemoryRouter initialEntries={['/report/image/1']}>
          <Routes>
            <Route path="/report/:pageType/:pageId" element={<ReportRouter />} />
          </Routes>
        </MemoryRouter>
      )
    ).toThrow(mockError);
  });

  test('pageType이 image일 경우 ReportImagePage를 렌더링해야 함', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockReportImageData,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/report/image/1']}>
        <Routes>
          <Route path="/report/:pageType/:pageId" element={<ReportRouter />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('report-image-page')).toBeInTheDocument();
  });

  test('pageType이 live일 경우 ReportLivePage를 렌더링해야 함', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockReportLiveData,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/report/live/1']}>
        <Routes>
          <Route path="/report/:pageType/:pageId" element={<ReportRouter />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('report-live-page')).toBeInTheDocument();
  });
});
