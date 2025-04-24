import { Report, ReportCategory } from '@asterum/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from '@/shared/services/reportService';
import InfiniteScroll from '@/components/global/InfiniteScroll';
import { getListMinHeight } from '@/shared/utils';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostBox from '@/components/report/PostBox';
import LoadingDim from '@/components/global/LoadingDim';

interface ReportListViewProps {
  category: ReportCategory | 'all';
  onRefetch?: (fn: () => Promise<unknown>) => void;
}

function ReportListView({ category, onRefetch }: ReportListViewProps) {
  const [postListHeight] = useState(() => getListMinHeight());

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['reports', category],
    queryFn: api.getReportsByCategory,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.lastVisible || null,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  // FIXME: Refetch, throw error
  if (isError) throw error;

  useEffect(() => {
    if (onRefetch && refetch) onRefetch(() => refetch());
  }, [onRefetch, refetch]);

  return (
    <>
      {isLoading && <LoadingDim />}
      <PostContainer minHeight={postListHeight} data-testid="post-container">
        {data?.pages
          .flatMap((page) => page.data)
          .map((report: Report) => (
            <PostBox key={report.id} report={report} />
          ))}
      </PostContainer>
      <InfiniteScroll
        fetchFn={fetchNextPage}
        isLoaded={isFetchingNextPage}
        isLastPage={!hasNextPage}
      />
    </>
  );
}

const PostContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'minHeight',
})<{ minHeight: number }>`
  width: var(--width);
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fill, 388px);
  gap: 16px;
  min-height: ${(props) => `${props.minHeight}px`};
`;

export default ReportListView;
