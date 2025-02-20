import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/landingService';
import { SliderImage } from '@asterum/types';
import DeleteIcon from '@mui/icons-material/Delete';
import { queryClient } from '../../main';
import RemoveIcon from '@mui/icons-material/Remove';

function ManageSliderImage() {
  const { data: images } = useQuery<SliderImage[]>({
    queryKey: ['slider'],
    queryFn: async () => {
      return await api.getSliderImages();
    },
  });

  const { data: viewed } = useQuery<SliderImage[]>({
    queryKey: ['slider-viewed'],
    queryFn: async () => {
      return await api.getViewdSliderImages();
    },
  });

  const updateSliderImage = useMutation({
    mutationFn: ({ sliderImg, order }: { sliderImg: SliderImage; order: number }) =>
      api.setSliderImage(sliderImg, order),
    onSuccess: (isSuccess: boolean) => {
      if (!isSuccess) throw new Error('이미지 추가 실패');
      queryClient.invalidateQueries({ queryKey: ['slider-viewed'] });
      queryClient.invalidateQueries({ queryKey: ['slider'] });
      alert('슬라이더 이미지 업데이트 완료');
    },
    onError: () => {
      alert('슬라이더 이미지 업데이트 실패!');
    },
  });

  const deleteDBImage = useMutation({
    mutationFn: (targetId: string) => api.deleteDBSliderImage(targetId),
    onSuccess: (isSuccess: boolean) => {
      if (!isSuccess) throw new Error('이미지 추가 실패');
      queryClient.invalidateQueries({ queryKey: ['slider'] });
      alert('서버 이미지 삭제 완료');
    },
    onError: () => {
      alert('서버 이미지 삭제 실패!');
    },
  });

  const updateViewedImage = async (targetImg: SliderImage, type: 'add' | 'remove') => {
    const updateOrder =
      type === 'remove' ? -1 : viewed && viewed.length ? viewed[viewed.length - 1].order + 1 : 0;

    updateSliderImage.mutate({ sliderImg: targetImg, order: updateOrder });
  };

  return (
    <Wrapper>
      <Title>현재 랜딩페이지에 보여주는 이미지들</Title>
      <SortContainer>
        {/* TODO: 드래그앤드랍으로 이미지 순서 관리하기
      현재: 이미지 추가 순으로 이미지 순서 자동으로 */}
        {viewed &&
          viewed.map((image) => (
            <ImgBox key={image.id}>
              <img src={image.imageUrl} alt={image.id} />
              <RemoveButton onClick={() => updateViewedImage(image, 'remove')}>
                <RemoveIcon fontSize="small" />
              </RemoveButton>
            </ImgBox>
          ))}
      </SortContainer>
      <HorizontalLine />
      <Title>전체 이미지</Title>
      <AllImagesContainer>
        {images &&
          images.map((image) => (
            <ImgBox key={image.id} isViewed={image.order !== -1}>
              <img src={image.imageUrl} alt={image.id} />
              {image.order === -1 && (
                <>
                  <AddButton
                    onClick={() => {
                      updateViewedImage(image, 'add');
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </AddButton>
                  <DeleteButton
                    onClick={() => {
                      deleteDBImage.mutate(image.id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </DeleteButton>
                </>
              )}
            </ImgBox>
          ))}
      </AllImagesContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color);
`;

const SortContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const AllImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ImgBox = styled.div<{ isViewed: boolean }>`
  position: relative;
  width: 300px;
  aspect-ratio: 1920/1080;
  border: 1px solid ${(props) => (props.isViewed ? 'red' : '#FFF')};
  cursor: ${(props) => props.isViewed && 'not-allowed'};

  & > img {
    width: 100%;
    aspect-ratio: 1920/1080;
    object-fit: fill;
    filter: brightness(${(props) => props.isViewed && '50%'});
  }

  &:hover {
    & > button {
      display: block;
    }
  }
`;

const Button = styled.button`
  display: none;
  position: absolute;
  cursor: pointer;
  padding: 4px 8px;
`;

const AddButton = styled(Button)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DeleteButton = styled(Button)`
  bottom: 10px;
  right: 10px;
  color: var(--dear);
`;

const RemoveButton = styled(Button)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ManageSliderImage;
