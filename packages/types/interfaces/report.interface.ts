import { Member } from './common.interface';

export interface Product {
  id: string;
  productName: string;
  productBrand: string; // 이미지 리포트에서 태그로 들어감
  productTumbnail: string;
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

export type ReortCategory = 'album' | 'fashion' | 'game' | 'live' | 'etc';

export interface Report {
  id: string;
  reportMembers: string[];
  reportTumbnail: string;
  includedProducts: { productId: string; members: Member[] };
  reportDate: { display: string; usage: string };
  reportType: ReportType;
  category: ReortCategory;
  reportTitle?: string; // 라이브 리포트에서만 사용
}
