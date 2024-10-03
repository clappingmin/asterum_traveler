import styled from 'styled-components';
import { Member } from '../../shared/interfaces/common.interface';
import { MEMBER_ENGLISH_NAME, MEMBER_KOREAN_NAME } from '../../shared/constants';
import yejunImage from '../../assets/images/member/yejun.png';
import noahImage from '../../assets/images/member/noah.png';
import bambyImage from '../../assets/images/member/bamby.png';
import eunhoImage from '../../assets/images/member/eunho.png';
import haminImage from '../../assets/images/member/hamin.png';

interface MemberBoxProps {
  member: Member;
}

function MemberBox({ member }: MemberBoxProps) {
  const MEMBER_IMAGE = {
    yejun: yejunImage,
    noah: noahImage,
    bamby: bambyImage,
    eunho: eunhoImage,
    hamin: haminImage,
  };

  return (
    <Wrapper>
      <MemberImg width="64" height="64" src={MEMBER_IMAGE[member]}></MemberImg>
      <NameBox>
        <KoreanName>{MEMBER_KOREAN_NAME[member]}</KoreanName>
        <EnglishName>{MEMBER_ENGLISH_NAME[member]}</EnglishName>
      </NameBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  height: 64px;
`;

const MemberImg = styled.img`
  flex: 0 0 64px;
  width: 64px;
  height: 64px;
`;

const NameBox = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const KoreanName = styled.div`
  color: var(--color);
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`;

const EnglishName = styled.div`
  color: var(--color);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;

export default MemberBox;
