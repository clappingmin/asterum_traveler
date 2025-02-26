import { Timestamp } from '@firebase/firestore/dist';
import { Member } from './common.interface';

export interface ProductBase {
  productName: string;
  productBrand: string; // 이미지 리포트에서 태그로 들어감
  productThumbnail: string;
  productUrl: string;
}

export interface Product extends ProductBase {
  id: string;
}

export type ReportType = 'image' | 'live';

/**
 * 'album': 앨범 관련 항목
 * 'fashion': 패션 관련 항목
 * 'game': 게임 관련 항목
 * 'live': 라이브 이벤트 관련 항목
 * 'etc': 그 외에 항목
 * ReportType이 live인 경우 live 고정
 *  */

export type ReportCategory = 'album' | 'fashion' | 'game' | 'live' | 'etc';

export type IncludedProduct = { productId: string; members: Member[] };

export interface ReportBase {
  reportType: ReportType; // 'image' | 'live'
  category: ReportCategory;
  reportMembers: Member[];
  reportThumbnail: string;
  includedProducts: IncludedProduct[];
  // reportDate: { display: string; usage: string };
  reportDateDisplay: string;
  reportDateUsage: string | Timestamp;
  liveTitle?: string; // 라이브 리포트에서만 사용
  imageTags?: string[];
  reportUrl?: string; // 바로가기 연결할 주소
}

export interface Report extends ReportBase {
  id: string;
}
