import { Report, ReportCategory } from '@asterum/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/reportService';
import InfiniteScroll from '../global/InfiniteScroll';
import { getListMinHeight } from '../../shared/utils';
import { useState } from 'react';
import styled from 'styled-components';
import PostBox from './PostBox';
import LoadingDim from '../global/LoadingDim';

interface ReportListViewProps {
  category: ReportCategory | 'all';
}

function ReportListView({ category }: ReportListViewProps) {
  const [postListHeight, _setPostListHeight] = useState<number>(getListMinHeight());

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading, error, isError } =
    useInfiniteQuery({
      queryKey: ['reports', category],
      queryFn: api.getReportsByCategory,
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.lastVisible || null,
      staleTime: 1000 * 60 * 5,
      retry: false,
    });

  if (isError) throw error;

  return (
    <>
      {isLoading && <LoadingDim />}
      <PostContainer minHeight={postListHeight}>
        {data?.pages
          .flatMap((page) => page.data)
          .map((report: Report) => (
            <PostBox key={report.id} report={report} />
          ))}
      </PostContainer>
      <InfiniteScroll
        fetchFn={fetchNextPage}
        isLoaded={isFetchingNextPage}
        isLastPage={!!!hasNextPage}
      />
    </>
  );
}

const PostContainer = styled.div<{ minHeight: number }>`
  width: var(--width);
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fill, 388px);
  gap: 16px;
  min-height: ${(props) => `${props.minHeight}px`};
`;

export default ReportListView;
