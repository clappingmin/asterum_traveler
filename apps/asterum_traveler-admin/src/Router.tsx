import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import ReportListPage from './pages/report/ReportListPage';
import ProductDetailPage from './pages/report/ProductDetailPage';
import ReportDetailPage from './pages/report/ReportDetailPage';
import ProductEditPage from './pages/report/ProductEditPage';
import ReportEditPage from './pages/report/ReportEditPage';
import SchedulePage from './pages/SchedulePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
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
      { path: 'schedule', element: <SchedulePage /> },
    ],
  },
]);

export default router;
