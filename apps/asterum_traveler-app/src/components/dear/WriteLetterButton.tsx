import styled from 'styled-components';
import pencilImg from '@/assets/images/dear/pencil.png';
import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ModalWriteLetter from '@/components/dear/ModalWriteLetter';

function WriteLetterButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <WritePencil
        width={1600}
        height={64}
        src={pencilImg}
        onClick={onOpen}
        alt="플레이브에게 카드 작성 모달 띄우기 버튼"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalWriteLetter onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}

const WritePencil = styled.img`
  width: var(--width);
  height: 64px;
  cursor: pointer;
`;

export default WriteLetterButton;
