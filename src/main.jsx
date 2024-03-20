import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppProvider from './components/AppProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router}></RouterProvider>
    </AppProvider>
  </React.StrictMode>
)
