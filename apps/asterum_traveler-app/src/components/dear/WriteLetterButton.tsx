import styled from 'styled-components';
import pencilImg from '../../assets/images/dear/pencil.png';
import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ModalWriteLetter from './ModalWriteLetter';

function WriteLetterButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <WritePencil width={1600} height={64} src={pencilImg} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalWriteLetter />
        </ModalContent>
      </Modal>
    </>
  );
}

const WritePencil = styled.img`
  width: var(--width);
  height: 64px;
`;

export default WriteLetterButton;
