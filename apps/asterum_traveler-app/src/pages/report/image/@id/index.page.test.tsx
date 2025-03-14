import { render, screen } from '@testing-library/react';
import ReportImagePage from '@/pages/report/image/@id/index.page';
import { mockReportImageData } from '@/shared/mocks';

jest.mock('@/components/report/MemberBox', () => ({ member }: { member: string }) => (
  <div data-testid={`member-${member}`}>{member}</div>
));
jest.mock(
  '@/components/report/ProductBox',
  () =>
    ({ includedProduct }: { includedProduct: any }) =>
      <div data-testid={`product-${includedProduct.productId}`}>{includedProduct.name}</div>
);
jest.mock(
  '@/components/global/error/FetchErrorBoundary',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="fetch-error-boundary">{children}</div>
);

describe('ReportImagePage', () => {
  test('ReportImagePage 렌더링 테스트', () => {
    render(<ReportImagePage reportData={mockReportImageData} />);

    // 썸네일 이미지가 정상적으로 표시되는지 확인
    const thumbnail = screen.getByAltText('리포트 이미지');
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', mockReportImageData.reportThumbnail);

    // 멤버들이 정상적으로 렌더링되는지 확인
    mockReportImageData.reportMembers.forEach((member) => {
      expect(screen.getByTestId(`member-${member}`)).toBeInTheDocument();
    });

    // 날짜 표시 확인
    expect(screen.getByText(mockReportImageData.reportDateDisplay)).toBeInTheDocument();
  });
});
