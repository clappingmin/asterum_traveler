import {
  IncludedProduct,
  Member,
  Product,
  ReportCategory,
  ReportBase,
  ReportType,
} from '@asterum/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as api from '../../shared/services/reportService';
import { textOverflowStyles } from '../../styles/common';
import { queryClient } from '../../main';
import { useNavigate } from 'react-router-dom';
import { convertDateToTimestamp } from '../../shared/utils';

function ReportEditPage() {
  const [reportType, setReportType] = useState<ReportType>('image');
  const [reportMembers, setReportMembers] = useState<Member[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [displayDate, setDisplayDate] = useState<string>('');
  const [usageDate, setUsageDate] = useState<string>('');
  const [category, setCategory] = useState<ReportCategory>('etc');
  const [liveTitle, setLiveTitle] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [imageTags, setImageTags] = useState<string[]>([]);
  const [reportUrl, setReportUrl] = useState<string>('');
  const [preview, setPreview] = useState<string | null>(null);
  const [includedProducts, setIncludedProducts] = useState<Map<string, Member[]>>(new Map());

  const navigate = useNavigate();

  const { data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      return await api.getProducts();
    },
  });

  const addReport = useMutation({
    mutationFn: (report: ReportBase) => api.addReport(report),
    onSuccess: (reportId: string) => {
      queryClient.invalidateQueries({ queryKey: ['reports', reportId] });
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

  /**
   * 멤버 선택 변경
   * @param {React.ChangeEvent<HTMLFormElement>} e
   */
  const changeSelectMember = (e: React.ChangeEvent<HTMLFormElement>) => {
    const selectedMember = e.target.value;

    setReportMembers((prevMembers) =>
      prevMembers.includes(selectedMember)
        ? prevMembers.filter((member: Member) => member !== selectedMember) // 제거
        : [...prevMembers, selectedMember]
    );
  };

  /**
   * 태그 추가하기
   * @param {React.KeyboardEvent<HTMLInputElement>} e
   * @return {void}
   */
  const addImageTag = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') return;

    const inputValue: string = (e.target as HTMLInputElement).value;

    if (inputValue.trim() !== '') {
      setImageTags((prevItems) => [...prevItems, inputValue.trim()]);
      setTag('');
    }

    return;
  };

  /**
   * 태그 삭제하기
   * @param {number} targetIndex
   */
  const deleteTag = (targetIndex: number): void => {
    setImageTags((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(targetIndex, 1);
      return updatedItems;
    });
  };

  /**
   * 참조할 제품 선택
   * @param {string} productId 선택한 제품 아이디
   */
  const changeSelectProduct = (productId: string) => {
    const hasProductId = includedProducts.has(productId);

    if (hasProductId) includedProducts.delete(productId);
    else includedProducts.set(productId, []);

    // MEMO: map을 바로 업데이트하면 같은 참조를 가지고 있어서 업데이트 안됨
    // 아래와 같이 새로운 map을 만들어서 다른 참조를 만들어줘야 함
    const updatedProducts = new Map(includedProducts);
    setIncludedProducts(updatedProducts);
  };

  /**
   * 제품에 연결한 멤버 변경
   * @param {string} productId 멤버가 변경된 제품 아이디
   * @param {Member} selectedMember 변경된 멤버
   */
  const changeProductMember = (productId: string, selectedMember: Member) => {
    // 제품이 존재하지 않을 경우
    if (!includedProducts.has(productId)) changeSelectProduct(productId);

    const beforeMembers: Member[] = includedProducts.get(productId) ?? [];

    const updatedMembers = beforeMembers.includes(selectedMember)
      ? beforeMembers.filter((member) => member !== selectedMember)
      : [...beforeMembers, selectedMember];

    includedProducts.set(productId, updatedMembers);
    const updatedProducts = new Map(includedProducts);

    setIncludedProducts(updatedProducts);
  };

  /**
   * 제품 저장하기
   * @returns
   */
  const saveProduct = async () => {
    const uploadedThumbnailUrl = thumbnail && (await api.imageUpload(thumbnail, 'reports'));
    if (!uploadedThumbnailUrl) return;

    const convertedProduts = convertMapToIncludedProduct(includedProducts);
    const coonvertedUsageDate = convertDateToTimestamp(usageDate);

    const report: ReportBase = {
      reportType,
      category,
      reportMembers,
      reportThumbnail: uploadedThumbnailUrl,
      includedProducts: convertedProduts,
      reportDateDisplay: displayDate,
      reportDateUsage: coonvertedUsageDate,
      liveTitle,
      imageTags,
      reportUrl,
    };

    addReport.mutate(report);
  };

  // MEMO: 이터러블 객체와 구조 분해 할당 정리
  const convertMapToIncludedProduct = (target: Map<string, Member[]>): IncludedProduct[] => {
    return Array.from(target.entries()).map(([key, value]) => ({
      productId: key,
      members: value,
    }));
  };

  return (
    <Wrapper>
      <TopContainer>
        <ThumbnailWrapper>
          <TumbnailLabel htmlFor="thumbnail">
            {preview && <TumbnailPreview src={preview} />}
          </TumbnailLabel>
          <ThumbnailInput
            type="file"
            accept="image/*"
            id="thumbnail"
            onChange={handleImageChange}
          />
        </ThumbnailWrapper>
        <ReportInputContainer>
          <InputWrapper>
            <InfoLabel>게시글 타입</InfoLabel>
            <form
              onChange={(e: React.ChangeEvent<HTMLFormElement>) => setReportType(e.target.value)}
            >
              <label>
                <input
                  type="radio"
                  name="reportType"
                  value="image"
                  defaultChecked={reportType === 'image'}
                />
                이미지
              </label>
              <label>
                <input
                  type="radio"
                  name="reportType"
                  value="live"
                  defaultChecked={reportType === 'live'}
                />
                라이브
              </label>
            </form>
          </InputWrapper>
          <InputWrapper>
            <InfoLabel>게시글 카테고리</InfoLabel>
            <form onChange={(e: React.ChangeEvent<HTMLFormElement>) => setCategory(e.target.value)}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="album"
                  defaultChecked={category === 'album'}
                />
                앨범
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="fashion"
                  defaultChecked={category === 'fashion'}
                />
                패션
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="game"
                  defaultChecked={category === 'game'}
                />
                게임
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="live"
                  defaultChecked={category === 'live'}
                />
                라이브
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="etc"
                  defaultChecked={category === 'etc'}
                />
                기타
              </label>
            </form>
          </InputWrapper>
          <InputWrapper>
            <InfoLabel>게시글 멤버</InfoLabel>
            <form onChange={(e: React.ChangeEvent<HTMLFormElement>) => changeSelectMember(e)}>
              <label>
                <input type="checkbox" name="member" value="yejun" />
                예준
              </label>
              <label>
                <input type="checkbox" name="member" value="noah" />
              </label>
              노아
              <label>
                <input type="checkbox" name="member" value="bamby" />
                밤비
              </label>
              <label>
                <input type="checkbox" name="member" value="eunho" />
                은호
              </label>
              <label>
                <input type="checkbox" name="member" value="hamin" />
                하민
              </label>
            </form>
          </InputWrapper>
          <HorizontalLine />
          <InputWrapper>
            <InfoLabel htmlFor="displayDate">보여주는 날짜</InfoLabel>
            <InfoInput
              id="displayDate"
              placeholder="displayDate"
              value={displayDate}
              onChange={(e) => setDisplayDate(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <InfoLabel htmlFor="usageDate">사용 날짜</InfoLabel>
            <InfoInput
              id="usageDate"
              placeholder="usageDate"
              type="date"
              value={usageDate}
              onChange={(e) => setUsageDate(e.target.value)}
            />
          </InputWrapper>
          <HorizontalLine />
          <InputWrapper>
            <InfoLabel htmlFor="reportUrl">연결할 주소</InfoLabel>
            <InfoInput
              id="reportUrl"
              placeholder="reportUrl"
              value={reportUrl}
              onChange={(e) => setReportUrl(e.target.value)}
            />
          </InputWrapper>
          <HorizontalLine />
          {reportType === 'live' && (
            <InputWrapper>
              <InfoLabel htmlFor="liveTitle">라이브 제목</InfoLabel>
              <InfoInput
                id="liveTitle"
                placeholder="liveTitle"
                value={liveTitle}
                onChange={(e) => setLiveTitle(e.target.value)}
              />
            </InputWrapper>
          )}
          {reportType === 'image' && (
            <>
              <InputWrapper>
                <InfoLabel htmlFor="imageTags">이미지 태그</InfoLabel>
                <InfoInput
                  id="imageTags"
                  placeholder="imageTags"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyUp={addImageTag}
                />
              </InputWrapper>
              <TagBox>
                {imageTags.map((data, index) => (
                  <Tag key={`tag-${index}`}>
                    {data} <button onClick={() => deleteTag(index)}>X</button>
                  </Tag>
                ))}
              </TagBox>
            </>
          )}
        </ReportInputContainer>
      </TopContainer>
      <HorizontalLine />
      <InfoLabel>게시글에 포함된 제품</InfoLabel>
      <ProductsContainer>
        {products?.map((product) => (
          <ProductBox key={product.id} isSelected={includedProducts.has(product.id)}>
            <ProductThumbnail
              src={product.productThumbnail}
              onClick={() => changeSelectProduct(product.id)}
            />
            <ProductName>{product.productBrand}</ProductName>
            <ProductName>{product.productName}</ProductName>
            <form
              onChange={(e: React.ChangeEvent<HTMLFormElement>) =>
                changeProductMember(product.id, e.target.value)
              }
            >
              <label>
                <input type="checkbox" name="member" value="yejun" />
                예준
              </label>
              <label>
                <input type="checkbox" name="member" value="noah" />
              </label>
              노아
              <label>
                <input type="checkbox" name="member" value="bamby" />
                밤비
              </label>
              <label>
                <input type="checkbox" name="member" value="eunho" />
                은호
              </label>
              <label>
                <input type="checkbox" name="member" value="hamin" />
                하민
              </label>
            </form>
          </ProductBox>
        ))}
      </ProductsContainer>
      <ConfirmButton onClick={saveProduct}>추가하기</ConfirmButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
`;

const ThumbnailWrapper = styled.div`
  flex: 0 0 350px;
  aspect-ratio: 960 / 540;
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

const ReportInputContainer = styled.div`
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

const TagBox = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  background-color: var(--report);
  border-radius: 999px;
  padding: 4px 12px;
  color: #000;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--label);
`;

const ProductsContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  gap: 5px;
`;

interface ProductBoxProps {
  isSelected: boolean;
}

const ProductBox = styled.div<ProductBoxProps>`
  width: 120px;
  padding: 10px;
  cursor: pointer;
  background: ${(props) => props.isSelected && 'var(--main)'};
  border-radius: 5px;
`;

const ProductThumbnail = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background: var(--label);
`;

const ProductName = styled.div`
  height: 50px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 450;
  line-height: 140%;
  color: var(--label);
  ${textOverflowStyles(2)}
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

export default ReportEditPage;
