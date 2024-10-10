import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import ReportListPage from './pages/ReportListPage';

import DearPage from './pages/DearPage';
import SchedulePage from './pages/SchedulePage';
import ReportRouter from './pages/ReportRouter';

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
      { path: 'report/:pageType/:pageId', element: <ReportRouter /> },
      { path: 'dear', element: <DearPage /> },
      { path: 'schedule', element: <SchedulePage /> },
    ],
  },
]);

export default router;
