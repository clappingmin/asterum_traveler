import styled from 'styled-components';
import icon_close from '../../assets/icons/close.svg';
import img_trash from '../../assets/images/dear/trash.png';

function ModalLetterDetail() {
  return (
    <Wrapper>
      <Header>
        <HeaderButton>
          <HeaderButtonIcon width={24} height={24} src={img_trash} />
        </HeaderButton>
        <HeaderButton>
          <HeaderButtonIcon width={24} height={24} src={icon_close} />
        </HeaderButton>
      </Header>
      <ContentContainer>
        <Writer>작성자이름 10자까지</Writer>
        <WriteDate>2024.11.18</WriteDate>
        <LetterContent>
          우리는 이 곳에서 서로에게 영감을 주고, 플레이브에 대한 감사와 사랑을 공유합니다. 이
          페이지는 추상적이고 아름다운 이야기의 집이며, 각자가 그 의미를 만들어갈 수 있는
          공간입니다. 플레이브와 함께하는 모든 순간은 우리에게 더 큰 의미를 부여하고, 그들의 음악은
          우리에게 특별한 여행을 선사합니다.함께 이 페이지에서 만나고, 플레이브와 함께하는 여정에서
          새로운 감동과 기억을 만들어 나가요. 감사합니다, 빛나는 여러분! 편지 내용입니다
        </LetterContent>
      </ContentContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 388px;
  min-height: 444px;
  background-color: var(--modal-black);
  border-radius: 10px;
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.12);
`;

const Header = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const HeaderButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: transparent;
`;

const HeaderButtonIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ContentContainer = styled.div`
  padding: 16px;
`;

const Writer = styled.div`
  color: var(--color);
  font-family: 'PartialSansKR' !important;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
`;

const WriteDate = styled.div`
  margin-top: 8px;
  color: #7f8082;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const LetterContent = styled.div`
  margin-top: 4px;
  color: var(--color);
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
`;

export default ModalLetterDetail;
