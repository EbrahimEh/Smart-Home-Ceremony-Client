import { RouterProvider } from 'react-router';
import { router } from './routes/router';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;