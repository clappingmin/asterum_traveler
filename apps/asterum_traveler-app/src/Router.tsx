import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import ReportListPage from './pages/report/ReportListPage';

import DearPage from './pages/DearPage';
import SchedulePage from './pages/SchedulePage';
import ReportRouter from './pages/report/ReportRouter';
import NotFoundPage from './pages/NotFoundPage';
import FetchErrorBoundary from './components/global/error/FetchErrorBoundary';

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
          <FetchErrorBoundary>
            <ReportRouter />
          </FetchErrorBoundary>
        ),
      },
      { path: 'dear', element: <DearPage /> },
      {
        path: 'schedule',
        element: <SchedulePage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
