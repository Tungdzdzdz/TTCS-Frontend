import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "./AppContext";

function Home() {
  const { authToken } = useAppContext();
  const authenticated = authToken ? true : false;
  console.log(authenticated);
  return (
    <div className='flex flex-col h-screen'>
      <Header authenticated={authenticated}/>
      <div className='h-full'>
        <Outlet />
        <ToastContainer limit={5}/>
      </div>
    </div>
  )
}

export default Home;