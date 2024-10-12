import styled from 'styled-components';
import pencilImg from '../../assets/images/pencil.png';

function WriteLetterButton() {
  return <WritePencil width={1600} height={64} src={pencilImg} />;
}

const WritePencil = styled.img`
  width: var(--width);
  height: 64px;
`;

export default WriteLetterButton;
