import { render, screen } from '@testing-library/react';
import { Page } from '@/pages/report/live/@id/index.page';
import { MemoryRouter } from 'react-router-dom';
import { mockReportLiveData } from '@/shared/mocks';

jest.mock(
  '@/components/global/error/FetchErrorBoundary',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="fetch-error-boundary">{children}</div>
);

jest.mock(
  '@/components/report/ProductBox',
  () =>
    ({ includedProduct }: { includedProduct: { productId: string } }) =>
      <div data-testid="product-box">{`Product: ${includedProduct.productId}`}</div>
);

jest.mock('@/components/report/MemberBox', () => ({ member }: { member: string }) => (
  <div data-testid="member-box">{`Member: ${member}`}</div>
));

describe('ReportLivePage', () => {
  test('ReportLivePage 렌더링 테스트', () => {
    render(
      <MemoryRouter>
        <Page />
      </MemoryRouter>
    );

    expect(screen.getByAltText('라이브 이미지')).toHaveAttribute(
      'src',
      mockReportLiveData.reportThumbnail
    );

    mockReportLiveData.liveTitle &&
      expect(screen.getByText(mockReportLiveData.liveTitle)).toBeInTheDocument();
    expect(screen.getByText(mockReportLiveData.reportDateDisplay)).toBeInTheDocument();
    expect(screen.getByTestId('fetch-error-boundary')).toBeInTheDocument();

    // 멤버들이 정상적으로 렌더링되는지 확인
    mockReportLiveData.reportMembers.forEach((member) => {
      expect(screen.getByText(`Member: ${member}`)).toBeInTheDocument();
    });

    // 제품이 정상적으로 렌더링되는지 확인
    mockReportLiveData.includedProducts.forEach((product) => {
      expect(screen.getByText(`Product: ${product.productId}`)).toBeInTheDocument();
    });
  });
});
