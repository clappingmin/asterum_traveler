import { IncludedProduct, Report } from '@asterum/types';
import { Timestamp } from 'firebase/firestore';

export const mockIncludedProductData: IncludedProduct = { productId: '-1', members: ['bamby'] };

export const mockReportImageData: Report = {
  id: '-1',
  reportType: 'image',
  category: ['fashion', 'etc'],
  reportMembers: ['bamby', 'hamin'],
  reportThumbnail: 'test-thumbnail.png',
  includedProducts: [mockIncludedProductData],
  reportDateDisplay: '202년 3월 6일',
  reportDateUsage: Timestamp.now(),
  imageTags: ['테스트'],
};

export const mockReportLiveData: Report = {
  id: '-1',
  reportType: 'live',
  category: ['fashion', 'etc'],
  reportMembers: ['bamby', 'hamin'],
  reportThumbnail: 'test-thumbnail.png',
  includedProducts: [mockIncludedProductData],
  reportDateDisplay: '202년 3월 6일',
  reportDateUsage: Timestamp.now(),
  imageTags: ['테스트'],
  liveTitle: '라이브 테스트',
};
