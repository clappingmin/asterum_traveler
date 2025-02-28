import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import ReportListPage from './pages/report/ReportListPage';

import DearPage from './pages/DearPage';
import SchedulePage from './pages/SchedulePage';
import ReportRouter from './pages/report/ReportRouter';
import NotFoundPage from './pages/NotFoundPage';
import ApiErrorBoundary from './components/global/error/ApiErrorBoundary';

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
        path: 'report/:pageType/:pageId',
        element: (
          <ApiErrorBoundary>
            <ReportRouter />
          </ApiErrorBoundary>
        ),
      },
      { path: 'dear', element: <DearPage /> },
      { path: 'schedule', element: <SchedulePage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
