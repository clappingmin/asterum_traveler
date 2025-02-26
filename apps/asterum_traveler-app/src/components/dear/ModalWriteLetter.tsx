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
import { motion } from 'framer-motion';
import { CardInputs } from '../../shared/interfaces/common.interface';

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
  // 빈 값 애니메이션 상태
  const [empties, setEmpties] = useState<Set<CardInputs>>(() => new Set());
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);

  // TODO: 최근에 추가한 카드 앞에 추가하게 수정
  const addDearCard = useMutation({
    mutationFn: (dearCard: DearCardBase) => api.addDearCard(dearCard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
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
    // 카드 인풋이 비었을 때
    if (!from || !password || !content || !cardCoverColor) {
      const newEmpties = new Set<CardInputs>();

      !!!from && newEmpties.add('from');
      !!!password && newEmpties.add('password');
      !!!content && newEmpties.add('content');
      !!!cardCoverColor && newEmpties.add('cardCoverColor');

      setEmpties(() => newEmpties);
      setShakeTrigger(true);

      setTimeout(() => {
        setShakeTrigger(false);
      }, 300);

      return;
    }

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
          <EmptyAnimation
            animate={empties.has('from') && shakeTrigger ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.2 }}
            className={empties.has('from') ? 'warning' : 'normal'}
          >
            <WriterInfoInput
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </EmptyAnimation>
          <EmptyAnimation
            animate={empties.has('password') && shakeTrigger ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.2 }}
            className={empties.has('password') ? 'warning' : 'normal'}
          >
            <WriterInfoInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </EmptyAnimation>
        </WriterContainer>
        <TextareaBox>
          <EmptyAnimation
            animate={empties.has('content') && shakeTrigger ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.2 }}
            className={empties.has('content') ? 'warning' : 'normal'}
          >
            <LetterTextarea
              placeholder="Dear,"
              maxLength={100}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              // cols={47}
              // rows={7}
            />
          </EmptyAnimation>
          <BoxBorderIcon src={icon_box_top_left} />
          <BoxBorderIcon src={icon_box_top_right} />
          <BoxBorderIcon src={icon_box_bottom_left} />
          <BoxBorderIcon src={icon_box_bottom_right} />
        </TextareaBox>
        <motion.div
          animate={
            empties.has('cardCoverColor') && shakeTrigger ? { x: [-10, 10, -10, 10, 0] } : {}
          }
          transition={{ duration: 0.2 }}
        >
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
        </motion.div>
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

const EmptyAnimation = styled(motion.div)`
  height: 100%;
  &.warning {
    input::placeholder,
    textarea::placeholder {
      color: #ec1d26;
    }
  }
`;

export default ModalWriteLetter;
