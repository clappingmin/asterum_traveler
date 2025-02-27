import { styled } from 'styled-components';
import Card from './Card';
import { useInfiniteQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/dearService';
import { DearCard } from '@asterum/types';
import InfiniteScroll from '../global/InfiniteScroll';

function LettersView() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: api.getDearCards,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.lastPage || undefined,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <Wrapper>
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

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  min-height: 100%;
  grid-template-rows: repeat(auto-fill, 388px);
`;

export default LettersView;
