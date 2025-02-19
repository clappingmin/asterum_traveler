import styled from 'styled-components';
import cdHole from '../../assets/images/landing/discography/cd_hole.png';

function DiscographyBoard() {
  return (
    <Wrapper>
      {/* TODO: 슬라이더로 변경하기 참고: https://vlast.co.kr/plave/ */}
      <CDBox>
        <CD className="cd-img">
          <CDImg src="https://i.namu.wiki/i/2jtVjIws6a90SFvUToXJ_2Gp8FBu98yOBDqXVbXYPyoP8fzOh7M9fifQc7s2kYJ9KU_kP1D-OuSa7Dyw_-Wp6axxGDyLWJRxklLTCZOgTnneJxB6JeABkWyF-muG6n8a_f2B0xTrZ_ThyUSmuoLmYg.webp" />
          <CDHole src={cdHole} width={124} height={124} />
        </CD>
        <CDInfo className="cd-info">
          <span>Asterum The shape of thinks to come</span>
          <span>2023.04.12</span>
        </CDInfo>
      </CDBox>
      <CDBox>
        <CD className="cd-img">
          <CDImg src="https://i.namu.wiki/i/2jtVjIws6a90SFvUToXJ_2Gp8FBu98yOBDqXVbXYPyoP8fzOh7M9fifQc7s2kYJ9KU_kP1D-OuSa7Dyw_-Wp6axxGDyLWJRxklLTCZOgTnneJxB6JeABkWyF-muG6n8a_f2B0xTrZ_ThyUSmuoLmYg.webp" />
          <CDHole src={cdHole} width={124} height={124} />
        </CD>
        <CDInfo className="cd-info">
          <span>Asterum The shape of thinks to come</span>
          <span>2023.04.12</span>
        </CDInfo>
      </CDBox>
      <CDBox>
        <CD className="cd-img">
          <CDImg src="https://i.namu.wiki/i/2jtVjIws6a90SFvUToXJ_2Gp8FBu98yOBDqXVbXYPyoP8fzOh7M9fifQc7s2kYJ9KU_kP1D-OuSa7Dyw_-Wp6axxGDyLWJRxklLTCZOgTnneJxB6JeABkWyF-muG6n8a_f2B0xTrZ_ThyUSmuoLmYg.webp" />
          <CDHole src={cdHole} width={124} height={124} />
        </CD>
        <CDInfo className="cd-info">
          <span>Asterum The shape of thinks to come</span>
          <span>2023.04.12</span>
        </CDInfo>
      </CDBox>
      <CDBox>
        <CD className="cd-img">
          <CDImg src="https://i.namu.wiki/i/2jtVjIws6a90SFvUToXJ_2Gp8FBu98yOBDqXVbXYPyoP8fzOh7M9fifQc7s2kYJ9KU_kP1D-OuSa7Dyw_-Wp6axxGDyLWJRxklLTCZOgTnneJxB6JeABkWyF-muG6n8a_f2B0xTrZ_ThyUSmuoLmYg.webp" />
          <CDHole src={cdHole} width={124} height={124} />
        </CD>
        <CDInfo className="cd-info">
          <span>Asterum The shape of thinks to come</span>
          <span>2023.04.12</span>
        </CDInfo>
      </CDBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0 160px;
  margin-bottom: 128px;
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
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
  &:hover {
  }
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

const CDInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  padding: 44px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  /* MEMO: font-size 앨범명 길이마다 달라서 default 값 넣어두고
  서버에서 저장한 데이터로 변경하기
  */
  color: #fff;
  text-align: center;
  font-style: normal;

  & > span:nth-child(1) {
    font-family: 'PartialSansKR' !important;
    font-size: 40px;
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
