import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import ReportListPage from './pages/ReportListPage';
import ReportDetailPage from './pages/ReportDetailPage';
import DearPage from './pages/DearPage';
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
      { path: 'report/:pageId', element: <ReportDetailPage /> },
      { path: 'dear', element: <DearPage /> },
      { path: 'schedule', element: <SchedulePage /> },
    ],
  },
]);

export default router;
