import { useParams } from 'react-router-dom';
import ReportLivePage from './ReportLivePage';
import ReportImagePage from './ReportImagePage';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/reportService';
import { Report } from '@asterum/types';
import NotFoundPage from '../NotFoundPage';
import LoadingDim from '../../components/global/LoadingDim';

interface ReportRouterParams {
  pageType: 'image' | 'live';
  pageId: string;
}

function ReportRouter() {
  const { pageType, pageId } = useParams<Partial<Record<keyof ReportRouterParams, string>>>();

  // 페이지 타입, 페이지 아이디가 없는 경우
  if (!pageType || !pageId) {
    return <NotFoundPage />;
  }

  // 페이지 타입이 잘못된 경우
  if (pageType !== 'image' && pageType !== 'live') return <NotFoundPage />;

  const { data, isLoading } = useQuery<Report>({
    queryKey: ['report', pageId],
    queryFn: async () => {
      return await api.getReportById(pageId);
    },
  });

  if (!data) {
    if (isLoading) return <LoadingDim />;
    else return <NotFoundPage />;
  }

  return (
    <>
      {isLoading && <LoadingDim />}
      {pageType === 'image' && <ReportImagePage reportData={data} />}
      {pageType === 'live' && <ReportLivePage reportData={data} />}
    </>
  );
}

export default ReportRouter;
