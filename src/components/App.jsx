import { Outlet } from 'react-router-dom'
import Header from './header/Header';
import { ToastContainer } from 'react-toastify';
import { useAppContext } from './AppContext';
import HeaderAdmin from './header/HeaderAdmin';
function App() {
  const {authToken, admin} = useAppContext();
  
  return (
    <div className='flex flex-col h-screen'>
      {
        admin ? <HeaderAdmin authenticated={authToken}/> : <Header authenticated={authToken}></Header>
      }
      <div className='h-full'>
        <Outlet/>
        <ToastContainer autoClose={3000} position='top-center' draggable={true} pauseOnHover={false}/>
      </div>
    </div>
  )
}

export default App;
