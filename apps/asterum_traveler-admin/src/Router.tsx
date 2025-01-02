import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import ReportListPage from './pages/report/ReportListPage';
import ProductDetailPage from './pages/report/ProductDetailPage';
import ReportDetailPage from './pages/report/ReportDetailPage';
import ProductEditPage from './pages/report/ProductEditPage';
import ReportEditPage from './pages/report/ReportEditPage';

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
        path: 'report/p/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: 'report/p/:productId/edit',
        element: <ProductEditPage />,
      },
      {
        path: 'report/r/:reportId',
        element: <ReportDetailPage />,
      },
      {
        path: 'report/r/:reportId/edit',
        element: <ReportEditPage />,
      },
    ],
  },
]);

export default router;
