import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/landing/LandingPage';
import ReportListPage from './pages/report/ReportListPage';
import ProductDetailPage from './pages/report/ProductDetailPage';
import ReportDetailPage from './pages/report/ReportDetailPage';
import ProductEditPage from './pages/report/ProductEditPage';
import ReportEditPage from './pages/report/ReportEditPage';
import SchedulePage from './pages/schedule/SchedulePage';
import ScheduleEdit from './pages/schedule/SheduleEdit';
import OverViewPage from './pages/OverViewPage';
import LandingEditImgSliderPage from './pages/landing/LandingEditImgSliderPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <OverViewPage />,
      },
      // 랜딩
      {
        path: 'landing',
        element: <LandingPage />,
      },
      {
        path: 'landing/edit/img-slider',
        element: <LandingEditImgSliderPage />,
      },
      {
        path: 'landing/edit/discography',
      },
      // 리포트
      {
        path: 'report',
        element: <ReportListPage />,
      },
      {
        path: 'report/product/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: 'report/edit/product/:productId?',
        element: <ProductEditPage />,
      },
      {
        path: 'report/report/:reportId',
        element: <ReportDetailPage />,
      },
      {
        path: 'report/edit/report/:reportId?',
        element: <ReportEditPage />,
      },
      // 스케줄
      {
        path: 'schedule',
        element: <SchedulePage />,
        children: [{ path: 'edit/:scheduleId?', element: <ScheduleEdit /> }],
      },
    ],
  },
]);

export default router;
