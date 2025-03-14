import styled from 'styled-components';
import img_card_pink from '@/assets/images/report/card_pink.png';
import img_card_red from '@/assets/images/report/card_red.png';
import img_card_orange from '@/assets/images/report/card_orange.png';
import img_card_yellow from '@/assets/images/report/card_yellow.png';
import img_card_green from '@/assets/images/report/card_green.png';
import img_card_skyblue from '@/assets/images/report/card_skyblue.png';
import img_card_blue from '@/assets/images/report/card_blue.png';
import img_card_yellowgreen from '@/assets/images/report/card_yellowgreen.png';
import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ModalLetterDetail from '@/components/dear/ModalLetterDetail';
import { CardCoverColor, DearCard } from '@asterum/types';
import { timestampToDisplayDate } from '@/shared/utils';
import { motion } from 'framer-motion';

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

interface CardProps {
  dearCard: DearCard;
}

function Card({ dearCard }: CardProps) {
  const { from, content, createdAt, cardCoverColor } = dearCard;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PerspectiveWrapper>
        <Wrapper
          initial={{ rotateY: 0 }}
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Cover coverColor={cardCoverColor} src={CARD_IMAGES[cardCoverColor]} />
          <MessageContainer onClick={onOpen}>
            <CardTitle>{from}</CardTitle>
            <CardDate>{timestampToDisplayDate(createdAt)}</CardDate>
            <CardContent>{content}</CardContent>
          </MessageContainer>
        </Wrapper>
      </PerspectiveWrapper>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={true}>
        <ModalOverlay />
        <ModalContent>
          {isOpen && <ModalLetterDetail onClose={onClose} dearCard={dearCard} />}
        </ModalContent>
      </Modal>
    </>
  );
}

const PerspectiveWrapper = styled.div`
  perspective: 800px;
`;

const Wrapper = styled(motion.div)`
  width: 388px;
  height: 388px;
  background-color: #242424;
  transform-style: preserve-3d;
  cursor: pointer;
  will-change: transform;

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
