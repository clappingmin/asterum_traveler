import styled from 'styled-components';
import yejunIcon from '../../assets/images/member/heart/yejun.png';
import noahIcon from '../../assets/images/member/heart/noah.png';
import bambyIcon from '../../assets/images/member/heart/bamby.png';
import eunhoIcon from '../../assets/images/member/heart/eunho.png';
import haminIcon from '../../assets/images/member/heart/hamin.png';
import { IncludedProduct, Product } from '@asterum/types';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/reportService';
import { sortMembers } from '../../shared/utils';

const MEMBER_ICON = {
  yejun: yejunIcon,
  noah: noahIcon,
  bamby: bambyIcon,
  eunho: eunhoIcon,
  hamin: haminIcon,
};

interface ProductBoxProps {
  includedProduct: IncludedProduct;
}

function ProductBox({ includedProduct: { productId, members } }: ProductBoxProps) {
  const { data } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      return await api.getProdcutById(productId);
    },
  });

  return (
    <Wrapper>
      <ProductTumbnail
        width="243"
        height="243"
        src={data?.productThumbnail}
        alt="제품 이미지"
        loading="lazy"
      />
      <ProductInfoBox>
        <ProductName className="text-overflow-2">{data?.productName}</ProductName>
        <BrandName className="text-overflow-1">{data?.productBrand}</BrandName>
        <MemberIconsContainer>
          {sortMembers(members).map(
            (member, index) =>
              members.includes(member) && (
                <MemberIconBox key={`productMember-${index}-${member}`}>
                  <MemberIcon width={28} height={28} src={MEMBER_ICON[member]} />
                  {index !== members.length - 1 && <span>,</span>}
                </MemberIconBox>
              )
          )}
        </MemberIconsContainer>
      </ProductInfoBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductTumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  user-select: text;
`;

const ProductName = styled.span`
  color: var(--color);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const BrandName = styled.span`
  color: var(--gray);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const MemberIconsContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const MemberIconBox = styled.div`
  display: flex;
  align-items: center;

  & > span {
    color: var(--color);
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
  }
`;

const MemberIcon = styled.img`
  height: 28px;
  aspect-ratio: 1;
`;

export default ProductBox;
