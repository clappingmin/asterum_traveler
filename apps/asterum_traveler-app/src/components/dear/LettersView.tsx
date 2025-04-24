import { styled } from 'styled-components';
import Card from '@/components/dear/Card';
import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from '@/shared/services/dearService';
import { DearCard } from '@asterum/types';
import InfiniteScroll from '@/components/global/InfiniteScroll';
import LoadingDim from '@/components/global/LoadingDim';
import { useEffect, useState } from 'react';
import { getListMinHeight } from '@/shared/utils';

interface LettersViewProps {
  onRefetch?: (fn: () => Promise<unknown>) => void;
}

function LettersView({ onRefetch }: LettersViewProps) {
  const [postListHeight, _setPostListHeight] = useState<number>(getListMinHeight());

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: api.getDearCards,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.lastVisible || null,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isError) throw error;

  useEffect(() => {
    if (onRefetch && refetch) onRefetch(() => refetch());
  }, [onRefetch, refetch]);

  return (
    <>
      {isLoading && <LoadingDim />}
      <Wrapper minHeight={postListHeight}>
        {data?.pages
          .flatMap((page) => page.data)
          .map((dearCard: DearCard) => (
            <Card key={`card-${dearCard.id}`} dearCard={dearCard} />
          ))}
      </Wrapper>
      <InfiniteScroll
        fetchFn={fetchNextPage}
        isLoaded={isFetchingNextPage}
        isLastPage={!!!hasNextPage}
      />
    </>
  );
}

const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'minHeight',
})<{ minHeight: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  grid-template-rows: repeat(auto-fill, 388px);
  min-height: ${(props) => `${props.minHeight}px`};
`;

export default LettersView;
