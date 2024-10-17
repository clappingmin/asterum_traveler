import styled from 'styled-components';
import img_card_pink from '../../assets/images/report/card_pink.png';
import img_card_red from '../../assets/images/report/card_red.png';
import img_card_orange from '../../assets/images/report/card_orange.png';
import img_card_yellow from '../../assets/images/report/card_yellow.png';
import img_card_green from '../../assets/images/report/card_green.png';
import img_card_skyblue from '../../assets/images/report/card_skyblue.png';
import img_card_blue from '../../assets/images/report/card_blue.png';
import img_card_yellowgreen from '../../assets/images/report/card_yellowgreen.png';
import { CardCoverColor } from '../../shared/interfaces/dear.interface';
import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ModalLetterDetail from './ModalLetterDetail';

function Card() {
  const TEMP_COLOR: CardCoverColor = 'red';

  const CARD_IMAGES = {
    pink: img_card_pink,
    red: img_card_red,
    orange: img_card_orange,
    yellow: img_card_yellow,
    green: img_card_green,
    skyblue: img_card_skyblue,
    blue: img_card_blue,
    yellowgreen: img_card_yellowgreen,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Wrapper>
        <Cover coverColor="red" src={CARD_IMAGES[TEMP_COLOR]} />
        <MessageContainer onClick={onOpen}>
          <CardTitle>작성자이름 10자까지</CardTitle>
          <CardDate>2024.11.18</CardDate>
          <CardContent>
            우리는 이 곳에서 서로에게 영감을 주고, 플레이브에 대한 감사와 사랑을 공유합니다. 이
            페이지는 추상적이고 아름다운 이야기의 집이며, 각자가 그 의미를 만들어갈 수 있는
            공간입니다. 플레이브와 함께하는 모든 순간은 우리에게 더 큰 의미를 부여하고, 그들의
            음악은 우리에게 특별한 여행을 선사합니다.함께 이 페이지에서 만나고, 플레이브와 함께하는
            여정에서 새로운 감동과 기억을 만들어 나가요. 감사합니다, 빛나는 여러분! 편지 내용입니다
          </CardContent>
        </MessageContainer>
      </Wrapper>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalLetterDetail />
        </ModalContent>
      </Modal>
    </>
  );
}

const Wrapper = styled.div`
  width: 388px;
  height: 388px;
  background-color: #242424;
  transition: transform 0.3s;
  transform: perspective(800px) rotateY(0deg);
  transform-style: preserve-3d;

  &:hover {
    transform: perspective(800px) rotateY(180deg);
  }

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
`;

interface CoverProps {
  coverColor: CardCoverColor;
}

const Cover = styled.img<CoverProps>`
  object-fit: cover;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  word-wrap: break-word;
  padding: 16px;
`;

const CardTitle = styled.div`
  color: var(--color);
  font-family: 'PartialSansKR' !important;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
`;

const CardDate = styled.div`
  margin-top: 8px;
  color: var(--gray);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;
const CardContent = styled.div`
  color: var(--color);
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
`;

export default Card;
