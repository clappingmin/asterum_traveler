import { Component, ReactNode } from 'react';
import { ApiError, sendMessageToSlack } from '../../../shared/errors';
import styled from 'styled-components';

class FetchErrorBoundary extends Component<
  { children: ReactNode; onRetry?: () => void },
  { hasError?: boolean; error: any }
> {
  constructor(props: { children: ReactNode; onRetry?: () => void }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
    console.error('Data Fetch 중 에러 발생:', error, errorInfo);
    sendMessageToSlack(error);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry?.();
  };

  render() {
    if (this.state.hasError) {
      const error = this.state.error;

      if (error instanceof ApiError) {
        return (
          <Wrapper>
            <span>잠시 후 시도해주세요</span>
            <p>요청을 처리하는데</p>
            <p>실패했습니다.</p>
            {error.canRetry && <RetryButton onClick={this.handleRetry}>다시 시도</RetryButton>}
          </Wrapper>
        );
      }

      return <Wrapper>알 수 없는 오류가 발생했습니다</Wrapper>;
    }

    return this.props.children;
  }
}

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  padding: 60px 30px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-break: keep-all;

  & > span {
    font-size: 44px;
    font-weight: 700;
  }

  & > p {
    font-size: 24px;
    line-height: 150%;

    &:nth-of-type(1) {
      margin-top: 10px;
    }
  }
`;

const RetryButton = styled.button`
  margin-top: 30px;
  padding: 16px 32px;
  background-color: var(--color);
  color: #000;
  font-size: 24px;
  font-weight: 700;
  min-width: 400px;
`;

export default FetchErrorBoundary;
