import styled from 'styled-components';
import cdHole from '@/assets/images/landing/discography/cd_hole.png';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/shared/services/landingService';

function DiscographyBoard() {
  const { data: discography } = useQuery({
    queryKey: ['discography'],
    queryFn: api.getDiscography,
  });

  return (
    <Wrapper className="scrollbar">
      {/* TODO: 슬라이더로 변경하기 참고: https://vlast.co.kr/plave/ */}

      {discography?.map((album) => (
        <CDBox key={album.id}>
          <CD className="cd-img">
            <CDImg
              src={album.imageUrl}
              width={400}
              height={400}
              alt={`플레이브 ${album.albumName} 앨범 커버 이미지`}
            />
            <CDHole src={cdHole} width={124} height={124} alt="CD 구멍" />
          </CD>
          <CDInfo className="cd-info" fontSize={album.albumName.length > 10 ? 'small' : 'large'}>
            <span>{album.albumName}</span>
            <span>{album.releaseDate}</span>
          </CDInfo>
        </CDBox>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 160px;
  margin-bottom: 128px;
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;

  &.scrollbar::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const CDBox = styled.div`
  position: relative;
  flex: 0 0 400px;
  width: 400px;
  height: 400px;
  border-radius: 50%;

  &:hover {
    & > div.cd-img {
      filter: brightness(50%);
    }
    & > div.cd-info {
      opacity: 1;
    }
  }
`;

const CD = styled.div`
  border-radius: 50%;
  background-color: var(--placeholder);
`;

const CDImg = styled.img`
  border-radius: 50%;
`;

const CDHole = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.5));
`;

const CDInfo = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'fontSize',
})<{ fontSize: 'small' | 'large' }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  padding: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  color: #fff;
  text-align: center;
  font-style: normal;

  & > span:nth-child(1) {
    font-family: 'PartialSansKR' !important;
    font-size: ${(props) => (props.fontSize === 'small' ? 40 : 44)}px;
    font-weight: 400;
    line-height: 150%;
  }

  & > span:nth-child(2) {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
  }
`;

export default DiscographyBoard;
