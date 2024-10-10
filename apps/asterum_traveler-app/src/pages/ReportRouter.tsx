import { useParams } from 'react-router-dom';
import ReportLivePage from './ReportLivePage';
import ReportImagePage from './ReportImagePage';

interface ReportRouterParams {
  pageType: 'image' | 'live';
  pageId: string;
}

function ReportRouter() {
  const { pageType, pageId } = useParams<Partial<Record<keyof ReportRouterParams, string>>>();

  if (!pageType || !pageId) {
    return <div>Invalid route parameters</div>;
  }

  switch (pageType) {
    case 'image':
      return <ReportImagePage />;
    case 'live':
      return <ReportLivePage />;
    default:
      return <div>Unknown page type</div>;
  }
}

export default ReportRouter;
