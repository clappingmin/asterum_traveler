import { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { sendMessageToSlack } from '@/shared/errors';

class GlobalErrorBoundary extends Component<
  { children: ReactNode },
  { hasError?: boolean; error: unknown }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    console.error('UI 렌더링 중 에러 발생:', error, errorInfo);
    sendMessageToSlack(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <span>잠시 후 시도해주세요</span>
          <p>요청을 처리하는데</p>
          <p>실패했습니다.</p>
          <BackHomeButton onClick={() => (window.location.href = '/')}>
            홈으로 돌아가기
          </BackHomeButton>
        </Wrapper>
      );
    }

    return this.props.children;
  }
}

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100vh;
  padding: 60px 30px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: keep-all;

  & > span {
    font-size: 32px;
    font-weight: 700;
  }

  & > p {
    font-size: 20px;
    line-height: 150%;

    &:nth-of-type(1) {
      margin-top: 10px;
    }
  }
`;

const BackHomeButton = styled.button`
  margin-top: 20px;
  padding: 16px 32px;
  background-color: var(--color);
  color: #000;
  font-size: 20px;
  font-weight: 700;
  min-width: 200px;
`;

export default GlobalErrorBoundary;
