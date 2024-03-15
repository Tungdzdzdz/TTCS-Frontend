import { Outlet, RouterProvider } from 'react-router-dom'
import router from '../router';
import AppProvider from './AppProvider';

function App() {

  return (
      <AppProvider>
        <RouterProvider router={router}></RouterProvider>
      </AppProvider>
  )
}

export default App;
