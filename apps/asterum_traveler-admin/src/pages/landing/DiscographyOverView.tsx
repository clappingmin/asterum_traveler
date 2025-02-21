import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import * as api from '../../shared/services/landingService';

function DiscographyOverView() {
  const { data: albums } = useQuery({ queryKey: ['discography'], queryFn: api.getAlbums });

  return (
    <Wrapper>
      {albums?.map((album) => (
        <DiscographyBox key={album.id}>
          <img src={album.imageUrl} alt={album.albumName} />
          <span>{album.albumName}</span>
          <span>{album.releaseDate}</span>
        </DiscographyBox>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
`;

const DiscographyBox = styled.div`
  background-color: #29292c;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;

  & > img {
    width: 100%;
    aspect-ratio: 1;
  }

  & > span:nth-of-type(1) {
    font-size: 20px;
    font-weight: 500;
  }

  & > span:last-of-type {
    font-size: 14px;
  }
`;

export default DiscographyOverView;
