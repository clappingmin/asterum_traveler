import { useParams } from 'react-router-dom';
import ReportLivePage from './ReportLivePage';
import ReportImagePage from './ReportImagePage';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../shared/services/reportService';
import { Report } from '@asterum/types';

interface ReportRouterParams {
  pageType: 'image' | 'live';
  pageId: string;
}

function ReportRouter() {
  const { pageType, pageId } = useParams<Partial<Record<keyof ReportRouterParams, string>>>();

  if (!pageType || !pageId) {
    return <div>Invalid route parameters</div>;
  }

  const { data } = useQuery<Report>({
    queryKey: ['report', pageId],
    queryFn: async () => {
      return await api.getReportById(pageId);
    },
  });

  if (!data) return <div>NO DATA</div>;

  switch (pageType) {
    case 'image':
      return <ReportImagePage reportData={data} />;
    case 'live':
      return <ReportLivePage reportData={data} />;
    default:
      return <div>Unknown page type</div>;
  }
}

export default ReportRouter;
