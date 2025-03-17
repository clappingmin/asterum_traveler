import { Link } from '@/renderer/Link';
import styled from 'styled-components';

function Page() {
  return (
    <Wrapper>
      <ButtonContainer>
        <span>404</span>
        <span>요청하신 페이지를 찾을 수 없습니다.</span>
        <Link href="/">
          <div>홈으로 돌아가기</div>
        </Link>
      </ButtonContainer>
      {/* TODO: SVG 추가 후 애니메이션 */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1 1 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: var(--color);

  & > span:first-child {
    display: block;
    font-family: 'PartialSansKR' !important;
    font-size: 60px;
  }

  & > div {
    color: var(--color);
    background: transparent;
    border: none;
  }
`;

export { Page };
