import styled from 'styled-components';
import yejunIcon from '@/assets/images/member/heart/yejun.png';
import noahIcon from '@/assets/images/member/heart/noah.png';
import bambyIcon from '@/assets/images/member/heart/bamby.png';
import eunhoIcon from '@/assets/images/member/heart/eunho.png';
import haminIcon from '@/assets/images/member/heart/hamin.png';
import { IncludedProduct, Product } from '@asterum/types';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/shared/services/reportService';
import { sortMembers } from '../../shared/utils';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MEMBER_KOREAN_NAME } from '@/shared/constants';

const MEMBER_ICON = {
  yejun: yejunIcon,
  noah: noahIcon,
  bamby: bambyIcon,
  eunho: eunhoIcon,
  hamin: haminIcon,
};

interface ProductBoxProps {
  includedProduct: IncludedProduct;
  onRefetch?: (fn: () => Promise<any>) => void;
}

function ProductBox({ includedProduct: { productId, members }, onRefetch }: ProductBoxProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  const { data, isError, error, refetch } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      return await api.getProdcutById(productId);
    },
    retry: false,
  });

  useEffect(() => {
    if (onRefetch && refetch) onRefetch(() => refetch());
  }, [onRefetch, refetch]);

  // FIXME: throw 하면서 useEffect 내부가 실행 전에 컴포넌트가 언마운트 된다.
  if (isError) throw error;

  return (
    <Wrapper>
      <ProductTumbnail
        width="243"
        height="243"
        src={data?.productThumbnail}
        alt={`ASTERUM TRAVELER 리포트 플레이브 제품 썸네일`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{
          opacity: loaded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <ProductInfoBox>
        <ProductName className="text-overflow-2">{data?.productName}</ProductName>
        <BrandName className="text-overflow-1">{data?.productBrand}</BrandName>
        <MemberIconsContainer data-testid="members-container">
          {sortMembers(members).map(
            (member, index) =>
              members.includes(member) && (
                <MemberIconBox key={`productMember-${index}-${member}`} data-testid={member}>
                  <MemberIcon
                    width={28}
                    height={28}
                    src={MEMBER_ICON[member]}
                    alt={`플레이브 ${MEMBER_KOREAN_NAME[member]} 대표 아이콘`}
                  />
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
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductTumbnail = styled(motion.img)`
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
