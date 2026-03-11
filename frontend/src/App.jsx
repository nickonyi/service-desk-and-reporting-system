import './styles/style.css';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext.jsx';
import { TicketsProvider } from './context/TicketsContext.jsx';
import { ArticlesProvider } from './context/ArticlesContext.jsx';
import { DateRangeProvider } from './context/DateRangeContext.jsx';
import { router } from './routes/Router.jsx';

function App() {
  return (
    <AuthProvider>
      <TicketsProvider>
        <ArticlesProvider>
          <DateRangeProvider>
            <RouterProvider router={router} />
          </DateRangeProvider>
        </ArticlesProvider>
      </TicketsProvider>
    </AuthProvider>
  );
}

export default App;
