import { Member } from './common.interface';

// 제품
interface Product {
  id: string;
  thumbnail: string;
  productName: string;
  brand: string;
  productUrl: string;
}

type ProductUsage = {
  productId: string;
  member: Member[];
};

interface ImageReportDetail {
  thumbnail: string;
  member: Member[];
  updateInfo: string;
  tags: string[];
  products: ProductUsage[];
}

interface LiveReportDetail {
  thumbnail: string;
  title: string;
  updateDate: Date;
  member: Member[];
  products: ProductUsage[];
}

type ReportType =
  | {
      id: string;
      reportType: 'image';
      detail: ImageReportDetail;
    }
  | {
      id: string;
      reportType: 'live';
      detail: LiveReportDetail;
    };
