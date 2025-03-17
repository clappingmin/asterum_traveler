import { useInfiniteQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import ReportListView from './ReportListView';
import { ReportCategory } from '@asterum/types';

jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(),
}));
jest.mock('@/components/global/LoadingDim', () => () => <div data-testid="loading-dim"></div>);
jest.mock('@/components/global/InfiniteScroll', () => () => (
  <div data-testid="infinite-scroll"></div>
));

describe('ReportListView', () => {
  const mockReportListViewProps: { category: ReportCategory | 'all' } = {
    category: 'all',
  };

  test('로딩 중이면 로딩딤이 보여야 한다.', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<ReportListView {...mockReportListViewProps} />);

    expect(screen.getByTestId('loading-dim')).toBeInTheDocument();
  });

  test('데이터 가져오기를 실패했을 경우 에러를 throw 해야 한다.', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error('데이터 가져오기 실패'),
    });

    expect(() => render(<ReportListView {...mockReportListViewProps} />)).toThrow(
      '데이터 가져오기 실패'
    );
  });

  // TODO: useInfiniteQuery 데이터 타입
  // describe('렌더링이 성공했을 때', () => {

  //   render(<ReportListView {...mockReportListViewProps} />);

  //   test('PostContainer의 minHeight가 올바른 값으로 설정되어야 한다.', () => {
  //     const expectedMinHeight = getListMinHeight();

  //     expect(screen.getByTestId('post-container')).toBeInTheDocument();
  //   });
  //   test('postBox와 무한 스크롤이 보여야 한다.');
  // });

  // TODO: 적당한 mockData 추가 후 스크롤 테스트 필요 - 스크롤시 데이터가 제대로 불러오는지
});
