import styled from 'styled-components';
import yejunIcon from '../../assets/images/member/heart/yejun.png';
import noahIcon from '../../assets/images/member/heart/noah.png';
import bambyIcon from '../../assets/images/member/heart/bamby.png';
import eunhoIcon from '../../assets/images/member/heart/eunho.png';
import haminIcon from '../../assets/images/member/heart/hamin.png';
import { Member } from '../../shared/interfaces/common.interface';

const MEMBER_ICON = {
  yejun: yejunIcon,
  noah: noahIcon,
  bamby: bambyIcon,
  eunho: eunhoIcon,
  hamin: haminIcon,
};

function ProductBox() {
  const MOCK_MEMBER: Member[] = ['yejun', 'noah', 'bamby'];
  return (
    <Wrapper>
      <ProductTumbnail
        width="243"
        height="243"
        src="https://i.namu.wiki/i/4khghYBSI1St9br_7FyzrXmSZxmPmf8NHmkYDjWk6sXxy0KajSMaRgl430uM-vZw63XC5bv0Bw36vfplsx-s_jdcYJEQs_2xsmotQZKpv2kgeUmt_AawupMDBKKWNgEiYgSsECSekLWI3XZZuD6cQw.webp"
      />
      <ProductInfoBox>
        <ProductName className="text-overflow-2">
          에센셜 캐시미어 오버핏 하이넥 니트 그레이 IESW3F502G2에센셜 캐시미어 오버핏 하이넥 니트
          그레이 IESW3F502G2
        </ProductName>
        <BrandName className="text-overflow-1">알꼬르소</BrandName>
        <MemberIconsContainer>
          {MOCK_MEMBER.map((member, index) => (
            <MemberIconBox>
              <MemberIcon width={28} height={28} src={MEMBER_ICON[member]} />
              {index !== MOCK_MEMBER.length - 1 && <span>,</span>}
            </MemberIconBox>
          ))}
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
  object-fit: contain;
`;

const ProductInfoBox = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.span`
  color: var(--color);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const BrandName = styled.span`
  color: #7f8082;
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
