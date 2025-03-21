import styled from 'styled-components';
import icon_close from '@/assets/icons/close.svg';
import img_trash from '@/assets/images/dear/trash.png';
import { DearCard } from '@asterum/types';
import { showSuccessToast, timestampToDisplayDate } from '@/shared/utils';
import { useMutation } from '@tanstack/react-query';
import * as api from '@/shared/services/dearService';
import { queryClient } from '@/renderer/PageShell';

interface ModalLetterDetailProps {
  onClose: () => void;
  dearCard: DearCard;
}

function ModalLetterDetail({ onClose, dearCard }: ModalLetterDetailProps) {
  const { from, content, password, createdAt, id } = dearCard;

  const deleteCard = useMutation({
    mutationFn: () => api.deleteDearCardByCardId(id),
    onSuccess: (isSuccess: boolean) => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      showSuccessToast('카드가 삭제되었습니다.');

      isSuccess && onClose();
    },
  });

  /**
   * 비밀번호 확인
   * @returns {boolean}
   */
  const handlePasswordInput = (): boolean | null => {
    const inputPassword = prompt('비밀번호를 입력하세요.');

    // 취소
    if (inputPassword === null) return null;

    if (inputPassword === password) return true;

    return false;
  };

  const deleteButtonClickHandler = () => {
    const passwordCheckResult = handlePasswordInput();

    // 비밀번호 확인
    if (!passwordCheckResult) {
      // 취소
      if (passwordCheckResult === null) return;

      alert('비밀번호가 다릅니다.');
      return;
    }

    deleteCard.mutate();
  };

  return (
    <Wrapper>
      <Header>
        <HeaderButton onClick={deleteButtonClickHandler}>
          <HeaderButtonIcon width={24} height={24} src={img_trash} alt="디어 카드 삭제 버튼" />
        </HeaderButton>
        <HeaderButton onClick={onClose}>
          <HeaderButtonIcon width={24} height={24} src={icon_close} alt="디어 카드 닫기 버튼" />
        </HeaderButton>
      </Header>
      <ContentContainer>
        <Writer>{from}</Writer>
        <WriteDate>{timestampToDisplayDate(createdAt)}</WriteDate>
        <LetterContent>{content}</LetterContent>
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
  outline: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }
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
  color: var(--gray);
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
