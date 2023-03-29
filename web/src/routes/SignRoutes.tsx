import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../pages/Login'

export const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
