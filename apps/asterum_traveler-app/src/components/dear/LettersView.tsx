import { styled } from 'styled-components';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import { DearCard } from '@asterum/types';
import * as api from '../../shared/services/dearService';

function LettersView() {
  const { data: dearCards } = useQuery<DearCard[]>({
    queryKey: ['cards'],
    queryFn: api.getDearCards,
  });

  return (
    <Wrapper>
      {dearCards?.map((dearCard) => (
        <Card key={`card-${dearCard.id}`} dearCard={dearCard} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export default LettersView;
