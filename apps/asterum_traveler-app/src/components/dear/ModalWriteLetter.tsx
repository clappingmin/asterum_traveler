import styled from 'styled-components';
import icon_close from '../../assets/icons/close.svg';
import icon_box_top_left from '../../assets/icons/box_top_left.svg';
import icon_box_top_right from '../../assets/icons/box_top_right.svg';
import icon_box_bottom_left from '../../assets/icons/box_bottom_left.svg';
import icon_box_bottom_right from '../../assets/icons/box_bottom_right.svg';
import icon_write_letter from '../../assets/images/dear/write_letter.png';
import icon_select_color from '../../assets/icons/select_color.svg';
import { useState } from 'react';
import { CardCoverColor, DearCardBase } from '@asterum/types';
import { useMutation } from '@tanstack/react-query';
import * as api from '../../shared/services/dearService';
import { queryClient } from '../../main';

const CARD_COVER_COLORS: CardCoverColor[] = [
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'skyblue',
  'blue',
  'yellowgreen',
];

interface ModalWriteLetterProps {
  onClose: () => void;
}

function ModalWriteLetter({ onClose }: ModalWriteLetterProps) {
  const [from, setFrom] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [cardCoverColor, setCardCoverColor] = useState<CardCoverColor | undefined>(undefined);

  const addDearCard = useMutation({
    mutationFn: (dearCard: DearCardBase) => api.addDearCard(dearCard),
    onSuccess: (cardId: string) => {
      queryClient.invalidateQueries({ queryKey: ['cards', cardId] });
      alert('카드 추가 완료');
      onClose();
    },
    onError: () => {
      alert('카드 추가 실패!');
    },
  });

  /**
   * 카드 배경 색성 변경
   * @param {React.MouseEvent<HTMLDivElement>} e
   */
  const changeCardCoverColor = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement;
    const color = (target.getAttribute('data-color') as CardCoverColor) || undefined;
    if (color) setCardCoverColor(color);
  };

  /**
   * 카드 추가하기
   * @return {void}
   */
  const saveDearCard = (): void => {
    // TODO: 비었을 경우 UI처리 추가
    if (!from || !password || !content || !cardCoverColor) return;

    const saveData: DearCardBase = {
      from,
      password,
      content,
      cardCoverColor,
    };

    addDearCard.mutate(saveData);

    return;
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={onClose}>
          <CloseIcon width={24} height={24} src={icon_close} />
        </CloseButton>
      </Header>
      <WriteContainer>
        <WriterContainer>
          <WriterInfoInput
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <WriterInfoInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </WriterContainer>
        <TextareaBox>
          <LetterTextarea
            placeholder="Dear,"
            maxLength={100}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            // cols={47}
            // rows={7}
          />
          <BoxBorderIcon src={icon_box_top_left} />
          <BoxBorderIcon src={icon_box_top_right} />
          <BoxBorderIcon src={icon_box_bottom_left} />
          <BoxBorderIcon src={icon_box_bottom_right} />
        </TextareaBox>
        <ColorSelectBox onClick={changeCardCoverColor}>
          {CARD_COVER_COLORS.map((color) => (
            <ColorBox
              key={`card-cover-${color}`}
              data-color={color}
              boxColor={color}
              isSelected={color === cardCoverColor}
            />
          ))}
        </ColorSelectBox>
        <WriteButton onClick={saveDearCard}>
          <img src={icon_write_letter} />
        </WriteButton>
      </WriteContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 432px;
  height: 464px;
  background-color: var(--modal-black);
  border-radius: 10px;
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.12);
`;

const Header = styled.div`
  padding: 16px;
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: transparent;
`;

const CloseIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const WriteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const WriterContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

const WriterInfoInput = styled.input`
  padding: 8px 10px;
  flex: 1 1 auto;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--color);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;

  &::placeholder {
    color: var(--gray);
    font-weight: 400;
  }
`;

const TextareaBox = styled.div`
  width: 100%;
  aspect-ratio: 2/1;
  position: relative;
`;

const LetterTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  padding: 8px;
  background-color: transparent;
  color: var(--color);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  outline: none;
  resize: none;

  &::placeholder {
    color: var(--gray);
    font-weight: 400;
  }
`;

const BoxBorderIcon = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;

  &:nth-of-type(1) {
    top: 0;
    left: 0;
  }
  &:nth-of-type(2) {
    top: 0;
    right: 0;
  }
  &:nth-of-type(3) {
    bottom: 0;
    left: 0;
  }
  &:nth-of-type(4) {
    bottom: 0;
    right: 0;
  }
`;

const ColorSelectBox = styled.div`
  display: flex;
  gap: 8px;
  width: fit-content;
  margin: auto;
`;

interface ColorBoxProps {
  boxColor: string;
  isSelected: boolean;
}

const ColorBox = styled.div<ColorBoxProps>`
  position: relative;
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => `var(--letter-${props.boxColor})`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    z-index: 1;
    background-image: ${(props) => (props.isSelected ? `url(${icon_select_color})` : 'none')};
  }
`;

const WriteButton = styled.div`
  cursor: pointer;
  margin: auto;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 60px;
    height: 47px;
  }
`;

export default ModalWriteLetter;
