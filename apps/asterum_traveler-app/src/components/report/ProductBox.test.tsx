import { useQuery } from '@tanstack/react-query';
import ProductBox from './ProductBox';
import { IncludedProduct } from '@asterum/types';
import { render, screen } from '@testing-library/react';
import { sortMembers } from '@/shared/utils';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

describe('ProductBox', () => {
  const mockOnRefetch = jest.fn();
  const mockProductBoxProps: {
    includedProduct: IncludedProduct;
    onRefetch?: (fn: () => Promise<any>) => void;
  } = {
    includedProduct: {
      productId: '-1',
      members: ['bamby', 'noah', 'hamin'],
    },
    onRefetch: mockOnRefetch,
  };

  describe('데이터 가져오기를 실패했을 때', () => {
    beforeEach(() => {
      (useQuery as jest.Mock).mockReturnValue({
        data: undefined,
        isError: true,
        error: new Error('테스트 제품 가져오기 실패'),
        refetch: jest.fn(),
      });
    });

    test('에러가 발생하면 throw 해야 한다', () => {
      expect(() => {
        render(<ProductBox {...mockProductBoxProps} />);
      }).toThrow('테스트 제품 가져오기 실패');
    });

    // test('에러가 발생하면 props로 전달 받은 onRefetch를 셋해야 한다.', async () => {
    //   render(<ProductBox {...mockProductBoxProps} />);

    //   await waitFor(() => {
    //     expect(mockOnRefetch).toHaveBeenCalledWith(expect.any(Function));
    //   });
    // });
  });

  describe('데이터 가져오기를 성공했을 때', () => {
    beforeEach(() => {
      (useQuery as jest.Mock).mockReturnValue({
        data: {
          id: '-1',
          productName: '테스트 제품',
          productBrand: '테스트 제품 브랜드',
          productThumbnail: '테스트 제품 이미지',
          productUrl: '테스트 제품 수조',
        },
        isError: false,
        error: null,
        refetch: null,
      });

      render(<ProductBox {...mockProductBoxProps} />);
    });

    test('제품의 이름, 브랜드명이 보여야 한다.', () => {
      expect(screen.getByText('테스트 제품')).toBeInTheDocument();
      expect(screen.getByText('테스트 제품 브랜드')).toBeInTheDocument();
    });

    test('제품의 멤버들이 순서대로 보여야 한다.', () => {
      const expectedOrder = sortMembers(['bamby', 'noah', 'hamin']);

      const memberIcons = screen.getByTestId('members-container').querySelectorAll('div');

      // 실제 렌더링된 멤버 아이콘 src 속성을 가져와 비교
      const renderedOrder = Array.from(memberIcons).map((box) => box.dataset.testid);

      // 예상된 순서의 아이콘들과 렌더링된 아이콘들의 순서 비교
      expect(renderedOrder).toEqual(expectedOrder);
    });
  });
});
