import { createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';
import Login from '../pages/Login';
import MainBoard from '../components/dashboardcomponents/MainBoard';
import KnowledgeBase from '../components/KnowledgeBase';
import AddArticle from '../components/AddarticleModal';
import Dashboard from '../layouts/Dashboard';
import NewTicketForm from '../components/NewTicketForm';
import TicketList from '../components/TicketList';
import ArticleDetails from '../pages/ArticleDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          { index: true, element: <MainBoard /> },
          {
            path: 'knowledge',
            element: <KnowledgeBase />,
          },
          {
            path: 'knowledge/new',
            element: <AddArticle />,
          },
          {
            path: 'knowledge/:articleId',
            element: <ArticleDetails />,
          },
          {
            path: 'tickets',
            element: <TicketList />,
          },
          {
            path: 'tickets/new',
            element: <NewTicketForm />,
          },
        ],
      },
    ],
  },
]);
