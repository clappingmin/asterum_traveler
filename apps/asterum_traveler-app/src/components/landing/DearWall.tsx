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
import dearBoard1 from '../../assets/images/landing/dearWall/dear_board_1.png';
import dearBoard2 from '../../assets/images/landing/dearWall/dear_board_2.png';
import dearBoard3 from '../../assets/images/landing/dearWall/dear_board_3.png';
import dearBackground1 from '../../assets/images/landing/dearWall/dear_background_1.png';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/landingService';
import { motion } from 'framer-motion';

function DearWall() {
  // TODO: 랜딩에 보여줄 카드 어드민에서 설정하기
  const { data: cards } = useQuery({
    queryKey: ['cards', 'lending'],
    queryFn: api.getThreeDearCards,
  });

  return (
    <Wrapper>
      <Background>
        <BackgroundTxtBox
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            ease: 'linear',
            repeat: Infinity,
            duration: 5,
          }}
        >
          <img src={dearBackground1} />
          <img src={dearBackground1} />
        </BackgroundTxtBox>
        <BackgroundTxtBox
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            ease: 'linear',
            repeat: Infinity,
            duration: 8,
          }}
        >
          <img src={dearBackground1} />
          <img src={dearBackground1} />
        </BackgroundTxtBox>
        <BackgroundTxtBox
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            ease: 'linear',
            repeat: Infinity,
            duration: 6,
          }}
        >
          <img src={dearBackground1} />
          <img src={dearBackground1} />
        </BackgroundTxtBox>
        <BackgroundTxtBox
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            ease: 'linear',
            repeat: Infinity,
            duration: 10,
          }}
        >
          <img src={dearBackground1} />
          <img src={dearBackground1} />
        </BackgroundTxtBox>
        <BackgroundTxtBox
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            ease: 'linear',
            repeat: Infinity,
            duration: 4,
          }}
        >
          <img src={dearBackground1} />
          <img src={dearBackground1} />
        </BackgroundTxtBox>
        <BackgroundTxtBox
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            ease: 'linear',
            repeat: Infinity,
            duration: 12,
          }}
        >
          <img src={dearBackground1} />
          <img src={dearBackground1} />
        </BackgroundTxtBox>
      </Background>
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

      <DearBoard background={dearBoard1} width={800} height={400} top={71} left={230}>
        <Board1From className="text-overflow-1">FROM.{cards?.length && cards[0].from}</Board1From>
        <Board1Content>{cards?.length && cards[0].content}</Board1Content>
      </DearBoard>
      <DearBoard
        background={dearBoard2}
        width={320}
        height={400}
        top={576}
        left={491}
        padding="10px"
      >
        <Board2Dear className="text-overflow-1">DEAR.플레이브</Board2Dear>
        <Board2Content>{cards && cards?.length > 1 && cards[1].content}</Board2Content>
        <Board2From className="text-overflow-1">
          FROM.{cards && cards?.length > 1 && cards[1].from}
        </Board2From>
      </DearBoard>
      <DearBoard
        background={dearBoard3}
        width={564}
        height={228}
        top={528}
        right={303}
        padding="0 38px"
      >
        <Board3From>
          <FromIcon>※</FromIcon>
          FROM.{cards && cards?.length > 2 && cards[2].from}
          <FromIcon>※</FromIcon>
        </Board3From>
        <Board3Content className="text-overflow-2">
          {cards && cards?.length > 2 && cards[2].content}
        </Board3Content>
      </DearBoard>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 1080px;
  position: relative;
  color: #fff;
  font-size: 200px;
  padding: 50px 0;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 43px;

  overflow: hidden;
`;

const BackgroundTxtBox = styled(motion.div)`
  height: 128px;
  display: flex;

  & > img {
    object-fit: cover;
  }
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
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  top: ${(props) => `${props.top}px`};
  left: ${(props) => (props.left ? `${props.left}px` : 'auto')};
  right: ${(props) => (props.right ? `${props.right}px` : 'auto')};
  transform: ${(props) => props.transform || ''};
`;

interface DearBoardProps extends StickerProps {
  background: string;
  padding?: string;
}

const DearBoard = styled.div<DearBoardProps>`
  position: absolute;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  background: url(${(props) => props.background}) no-repeat center center;
  background-size: cover;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => (props.left ? `${props.left}px` : 'auto')};
  right: ${(props) => (props.right ? `${props.right}px` : 'auto')};
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.padding || 0};
`;

const Text = styled.span`
  color: #000;
  font-family: 'PartialSansKR' !important;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
`;

const Board1From = styled(Text)`
  margin: 12px 16px;
  margin-left: auto;
  line-height: 32px;
`;

const Board1Content = styled(Text)`
  margin: 16px;
  width: 768px;
  max-height: 312px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  // NOTE: ...으로 표기 안되는 폰트임
  // TODO: common style로 빼기 함수로 만들어서 변수로 줄 받아서 사용하게 변경
`;

const Board2Dear = styled(Text)`
  width: 260px;
  margin: 16px 20px;
  line-height: 32px;
`;

const Board2Content = styled(Text)`
  margin: 16px;
  width: 268px;
  height: 215px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const Board2From = styled(Text)`
  margin: 16px;
  margin-left: auto;
  max-width: 200px;
  line-height: 32px;
`;

const Board3From = styled(Text)`
  width: 100%;
  height: 93px;
  color: #ec1d26;
  font-size: 32px;
  line-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const FromIcon = styled.span`
  font-family: 'Noto Sans KR' !important;
  color: #ec1d26;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px;
`;

const Board3Content = styled(Text)`
  color: #fff;
  margin-top: 11px;
`;

export default DearWall;
