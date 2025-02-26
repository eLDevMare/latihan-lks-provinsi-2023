import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import Validation from './pages/Validation'
import Vacancies from './pages/Vacancies'
import VacanciesDetail from './pages/VacanciesDetail'

function App() {
  const router = createBrowserRouter([
    {
      path:"/login",
      element: <Login/>
    },
    {
      path: "/dashboard",
      element: <Dashboard/>
    },
    {
      path:"/validation",
      element:<Validation/>
    },
    {
      path: "/vacancies",
      element: <Vacancies/>
    },
    {
      path:"/detail/:id",
      element:<VacanciesDetail/>
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
