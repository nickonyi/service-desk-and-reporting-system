import { createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';
import Login from '../pages/Login';
import KnowledgeBase from '../components/KnowledgeBase';
import AddArticle from '../components/AddarticleModal';
import Dashboard from '../layouts/Dashboard';
import NewTicketForm from '../components/NewTicketForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <Dashboard />,
        children: [
          {
            path: '/knowledge',
            element: <KnowledgeBase />,
          },
          {
            path: '/knowledge/add',
            element: <AddArticle />,
          },
          {
            path: '/Newticket',
            element: <NewTicketForm />,
          },
        ],
      },
    ],
  },
]);
