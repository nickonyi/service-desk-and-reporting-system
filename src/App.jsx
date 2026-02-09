import './styles/style.css';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext.jsx';
import { TicketsProvider } from './context/TicketsContext.jsx';
import { router } from './routes/Router.jsx';

function App() {
  return (
    <>
      <AuthProvider>
        <TicketsProvider>
          <RouterProvider router={router} />
        </TicketsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
