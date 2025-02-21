import { useState } from 'react';
import styled from 'styled-components';
import { formatDate } from '../../shared/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/landingService';
import { queryClient } from '../../main';
import { Album } from '@asterum/types';

function LandingEditDiscographyPage() {
  const [albumName, setAlbumName] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [albumCover, setAlbumCover] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState<string>();

  const { data: albums } = useQuery({ queryKey: ['discography'], queryFn: api.getAlbums });

  const addAlbum = useMutation({
    mutationFn: ({
      albumCover,
      albumName,
      releaseDate,
    }: {
      albumCover: File;
      albumName: string;
      releaseDate: string;
    }) => api.addAlbum(albumCover, albumName, releaseDate),
    onSuccess: (albumCoverUrl: string) => {
      queryClient.invalidateQueries({ queryKey: ['discography'] });
      setCoverUrl(albumCoverUrl);
      alert('앨범 추가 완료');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAlbumCover(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setCoverUrl(reader.result as string);
    }
  };

  const handleAddAlbum = () => {
    if (!albumCover) return;

    // 날짜 형식 변경
    const formatedDate = formatDate(releaseDate);

    const uploadInfo: { albumCover: File; albumName: string; releaseDate: string } = {
      albumCover,
      albumName,
      releaseDate: formatedDate,
    };

    addAlbum.mutate(uploadInfo);
  };

  return (
    <Wrapper>
      디스코그래피 수정 굳이 드래그앤드랍 순서 변경 넣을 필요없이 순서대로 넣으면 되는거니까 add,
      delete만
      <Container>
        <ImgUploadContainer>
          <label htmlFor="cover">
            <img src={coverUrl} />
          </label>
          <input type="file" accept="image/*" id="cover" onChange={handleImageChange} />
        </ImgUploadContainer>
        <AlbumInputContainer>
          <div>
            <InputBox>
              <label htmlFor="albumName">앨범명</label>
              <input
                id="albumName"
                placeholder="앨범명"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
              />
            </InputBox>
            <InputBox>
              <label htmlFor="albumName">발매일</label>
              <input
                id="releaseDate"
                type="date"
                placeholder="발매일"
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </InputBox>
          </div>
          <Button onClick={handleAddAlbum}>추가하기</Button>
        </AlbumInputContainer>
      </Container>
      <UploadedContainer>
        {albums &&
          albums.map((album: Album) => (
            <AlbumBox>
              <img src={album.imageUrl} alt={album.albumName} />
              <span>{album.albumName}</span>
              <span>{album.releaseDate}</span>
            </AlbumBox>
          ))}
        {/* TODO: 삭제하기 */}
      </UploadedContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const ImgUploadContainer = styled.div`
  width: 300px;
  aspect-ratio: 1;
  border: 1px solid var(--color);

  & > input {
    display: none;
  }

  & > label {
    display: inline-block;
    width: 100%;
    height: 100%;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;

const AlbumInputContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
`;

const InputBox = styled.div`
  display: flex;
  gap: 10px;

  & > label {
    font-size: 16px;
    font-weight: 500;
  }

  & > input {
    font-size: 20px;
  }

  &:last-of-type {
    margin-top: 10px;
  }
`;

const UploadedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const AlbumBox = styled.div`
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

const Button = styled.button`
  margin-left: auto;
  width: fit-content;
  padding: 8px 16px;
  font-size: 24px;
  margin-top: auto;
  cursor: pointer;
`;

export default LandingEditDiscographyPage;
