import { Outlet } from 'react-router-dom'
import Header from './header/Header';
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <div className='flex flex-col h-screen'>
      <Header></Header>
      <div className='h-full'>
        <Outlet/>
        <ToastContainer autoClose={3000} position='top-center'/>
      </div>
    </div>
  )
}

export default App;
