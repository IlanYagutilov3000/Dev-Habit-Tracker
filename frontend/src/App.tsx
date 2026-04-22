import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './components/protecteRoutes/ProtectedRoutes';


function App() {


  return (
    <>
      <Router>

        <AuthProvider>

          <Routes>
            <Route path='/' element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>

        </AuthProvider>

      </Router>
    </>
  )
}

export default App
