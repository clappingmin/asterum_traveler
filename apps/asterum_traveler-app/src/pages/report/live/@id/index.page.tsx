import styled from 'styled-components';
import MemberBox from '@/components/report/MemberBox';
import ProductBox from '@/components/report/ProductBox';
import { Report } from '@asterum/types';
import { ALL_MEMBERS } from '@/shared/constants';
import { useState } from 'react';
import FetchErrorBoundary from '@/components/global/error/FetchErrorBoundary';
import { usePageContext } from '@/renderer/usePageContext';
import { goToNotFound } from '@/shared/utils';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/shared/services/reportService';
import LoadingDim from '@/components/global/LoadingDim';
import { motion } from 'framer-motion';

function Page() {
  const { urlPathname } = usePageContext();

  const pageId = urlPathname.split('/')[3];
  if (!pageId) goToNotFound();

  const { data, isLoading, error, isError } = useQuery<Report>({
    queryKey: ['report', pageId],
    queryFn: async () => {
      return await api.getReportById(pageId);
    },
    retry: false,
  });

  if (isError) throw error;

  if (!isLoading && !data) {
    goToNotFound();
    return;
  }

  const [loaded, setLoaded] = useState<boolean>(false);
  const [refetchFn, setRefetchFn] = useState<(() => Promise<any>) | null>(null);

  return (
    <>
      {isLoading && <LoadingDim />}
      <Wrapper>
        <LiveContainer>
          <LiveThumbnail
            src={data?.reportThumbnail}
            width={960}
            height={540}
            alt="라이브 이미지"
            onLoad={() => {
              setLoaded(true);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <LiveTitle className="text-overflow-2">{data?.liveTitle}</LiveTitle>
          <LiveDate>{data?.reportDateDisplay}</LiveDate>
          <LiveMembers>
            {ALL_MEMBERS.map((member) => {
              return (
                data?.reportMembers.includes(member) && <MemberBox key={member} member={member} />
              );
            })}
          </LiveMembers>
        </LiveContainer>
        <FetchErrorBoundary onRetry={() => refetchFn && refetchFn()}>
          <ProductContainer>
            {data?.includedProducts.map((product) => {
              return (
                <ProductBox
                  key={product.productId}
                  includedProduct={product}
                  onRefetch={setRefetchFn}
                />
              );
            })}
          </ProductContainer>
        </FetchErrorBoundary>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: var(--width);
  margin: var(--header-height) auto;
  padding-top: 64px;
  display: flex;
  align-items: flex-start;
  gap: 64px;
  user-select: none;
  /* overflow-x: hidden; */
`;

const LiveContainer = styled.div`
  width: 960px;
  flex: 0 0 960px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: calc(var(--header-height) + 64px);
`;

const LiveThumbnail = styled(motion.img)`
  width: 100%;
  height: 540px;
  aspect-ratio: 16/9;
  object-fit: contain;
  border-radius: 10px;
`;

const LiveTitle = styled.span`
  color: var(--color);
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
`;

const LiveDate = styled.span`
  color: var(--color);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;

const LiveMembers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

const ProductContainer = styled.div`
  flex: 1 1 auto;
  display: grid;
  grid-template-columns: 243px 243px;
  gap: 16px 8px;
`;

export const documentProps = {
  title: '플레이브의 라이브, 게임 및 스타일 리포트 - Report',
  description:
    '플레이브가 입은 의상, 참여한 게임, 그리고 최신 라이브 정보를 모아둔 팬들을 위한 리포트 페이지. 모든 스타일과 기록을 확인하세요!',
};
export { Page };
