import styled from 'styled-components';
import sticker1 from '../../assets/images/landing/dearWall/sticker_1.png';
import sticker2 from '../../assets/images/landing/dearWall/sticker_2.png';
import sticker3 from '../../assets/images/landing/dearWall/sticker_3.png';
import sticker4 from '../../assets/images/landing/dearWall/sticker_4.png';
import sticker5 from '../../assets/images/landing/dearWall/sticker_5.png';
import sticker6 from '../../assets/images/landing/dearWall/sticker_6.png';
import sticker7 from '../../assets/images/landing/dearWall/sticker_7.png';
import sticker8 from '../../assets/images/landing/dearWall/sticker_8.png';
import sticker9 from '../../assets/images/landing/dearWall/sticker_9.png';
import sticker10 from '../../assets/images/landing/dearWall/sticker_10.png';
import sticker11 from '../../assets/images/landing/dearWall/sticker_11.png';

function DearWall() {
  return (
    <Wrapper>
      <Sticker src={sticker1} width={207} height={145} top={839} right={281} />
      <Sticker src={sticker2} width={160} height={160} top={313} right={270} />
      <Sticker src={sticker3} width={200} height={140} top={488} left={151} />
      <Sticker
        src={sticker4}
        width={187}
        height={334}
        top={133}
        right={475}
        transform="rotate(13.756deg)"
      />
      <Sticker src={sticker5} width={133} height={133} top={705} right={105} />
      <Sticker src={sticker6} width={100} height={100} top={890} left={359} />
      <Sticker src={sticker7} width={184} height={184} top={501} left={819} />
      <Sticker
        src={sticker8}
        width={166}
        height={209}
        top={726}
        left={192}
        transform="rotate(38.575deg)"
      />
      <Sticker
        src={sticker9}
        width={395}
        height={199}
        top={794}
        right={608}
        transform="rotate(7.268deg)"
      />
      <Sticker src={sticker10} width={206} height={199} top={58} right={156} />
      <Sticker src={sticker11} width={122} height={115} top={87} right={674} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 1080px;
  position: relative;
  border: 1px solid blue;
  color: #fff;
  font-size: 200px;
  padding: 50px 0;
`;

interface StickerProps {
  width: number;
  height: number;
  top: number;
  left?: number;
  right?: number;
  transform?: string;
}

const Sticker = styled.img<StickerProps>`
  position: absolute;
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  top: ${(props) => `${props.top}px`};
  left: ${(props) => (props.left ? `${props.left}px` : 'auto')};
  right: ${(props) => (props.right ? `${props.right}px` : 'auto')};
  transform: ${(props) => props.transform || ''};
`;

export default DearWall;
