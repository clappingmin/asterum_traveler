import styled from 'styled-components';
import icon_close from '../../assets/icons/close.svg';
import icon_box_top_left from '../../assets/icons/box_top_left.svg';
import icon_box_top_right from '../../assets/icons/box_top_right.svg';
import icon_box_bottom_left from '../../assets/icons/box_bottom_left.svg';
import icon_box_bottom_right from '../../assets/icons/box_bottom_right.svg';
import icon_write_letter from '../../assets/images/dear/write_letter.png';
import icon_select_color from '../../assets/icons/select_color.svg';

function ModalWriteLetter() {
  return (
    <Wrapper>
      <Header>
        <CloseButton>
          <CloseIcon width={24} height={24} src={icon_close} />
        </CloseButton>
      </Header>
      <WriteContainer>
        <WriterContainer>
          <WriterInfoInput placeholder="From" />
          <WriterInfoInput placeholder="Password" />
        </WriterContainer>
        <TextareaBox>
          <LetterTextarea
            placeholder="Dear,"
            maxLength={100}
            // cols={47}
            // rows={7}
          />
          <BoxBorderIcon src={icon_box_top_left} />
          <BoxBorderIcon src={icon_box_top_right} />
          <BoxBorderIcon src={icon_box_bottom_left} />
          <BoxBorderIcon src={icon_box_bottom_right} />
        </TextareaBox>
        <ColorSelectBox>
          <ColorBox boxColor={'pink'} isSelected={true} />
          <ColorBox boxColor={'red'} isSelected={false} />
          <ColorBox boxColor={'orange'} isSelected={false} />
          <ColorBox boxColor={'yellow'} isSelected={false} />
          <ColorBox boxColor={'green'} isSelected={false} />
          <ColorBox boxColor={'skyblue'} isSelected={false} />
          <ColorBox boxColor={'blue'} isSelected={false} />
          <ColorBox boxColor={'yellowgreen'} isSelected={false} />
        </ColorSelectBox>
        <WriteButton>
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
  font-weight: 400;
  line-height: 24px;

  &::placeholder {
    color: #7f8082;
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
  font-weight: 400;
  line-height: 24px;
  outline: none;
  resize: none;

  &::placeholder {
    color: #7f8082;
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
