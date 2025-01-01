import { Member } from './common.interface';

export interface Product {
  id: string;
  productName: string;
  productBrand: string;
  productTumbnail: string;
}

export type ReportType = 'image' | 'live';

export interface Report {
  id: string;
  reportMembers: string[];
  reportTumbnail: string;
  includedProducts: { productId: string; members: Member[] };
  reportDate: { display: string; usage: string };
  reportType: ReportType;
  tags?: string; // 이미지 리포트에서만 사용
  reportTitle?: string; // 라이브 리포트에서만 사용
}
