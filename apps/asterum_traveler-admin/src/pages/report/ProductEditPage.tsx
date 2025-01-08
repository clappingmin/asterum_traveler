import { useState } from 'react';
import styled from 'styled-components';
import * as api from '../../shared/services/reportService';
import { ProductBase } from '@asterum/types';
import { queryClient } from '../../main';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function ProductEditPage() {
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const addProduct = useMutation({
    mutationFn: (product: ProductBase) => api.addProduct(product),
    onSuccess: (productId: string) => {
      queryClient.invalidateQueries({ queryKey: ['products', productId] });
      alert('제품 추가 완료');
      navigate(-1);
    },
    onError: () => {
      alert('제품 추가 실패!');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result as string);
    }
  };

  const saveProduct = async () => {
    // TODO: 에러 처리
    if (!thumbnail || !productName || !productBrand || !productUrl) return;

    const uploadedThumbnailUrl = await api.imageUpload(thumbnail, 'products');

    if (!uploadedThumbnailUrl) return;

    const product: ProductBase = {
      productName,
      productBrand,
      productUrl,
      productThumbnail: uploadedThumbnailUrl,
    };

    addProduct.mutate(product);
    /**
     * TODO: 제품 저장후 성공시 이전 페이지로 이동
     */
  };

  return (
    <Wrapper>
      <ThumbnailWrapper>
        <TumbnailLabel htmlFor="thumbnail">
          {preview && <TumbnailPreview src={preview} />}
        </TumbnailLabel>
        <ThumbnailInput type="file" accept="image/*" id="thumbnail" onChange={handleImageChange} />
      </ThumbnailWrapper>
      <InfoWrapper>
        <InputWrapper>
          <InfoLabel htmlFor="productName">제품 이름</InfoLabel>
          <InfoInput
            id="productName"
            placeholder="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <InfoLabel htmlFor="productBrand">제품 브랜드</InfoLabel>
          <InfoInput
            id="productBrand"
            placeholder="productBrand"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <InfoLabel htmlFor="productBrand">제품 주소</InfoLabel>
          <InfoInput
            id="productUrl"
            placeholder="productUrl"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
          />
        </InputWrapper>
        <ConfirmButton onClick={saveProduct}>추가하기</ConfirmButton>
      </InfoWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
`;

const ThumbnailWrapper = styled.div`
  flex: 0 0 350px;
  height: 350px;
  border-radius: 20px;
  background: var(--main);
  overflow: hidden;
`;

const TumbnailLabel = styled.label`
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ThumbnailInput = styled.input`
  display: none;
`;

const TumbnailPreview = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: contain;
`;

const InfoWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoLabel = styled.label`
  min-width: 100px;
  color: var(--label);
  font-size: 16px;
  font-weight: 450;
  line-height: 140%;
`;

const InfoInput = styled.input`
  color: var(--color);
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color);
  outline: none;
  font-size: 18px;
  line-height: 140%;
  padding: 4px;
`;

const ConfirmButton = styled.button`
  margin-top: auto;
  margin-left: auto;
  width: 200px;
  padding: 16px 24px;
  border-radius: 10px;
  background: var(--main);
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

export default ProductEditPage;
