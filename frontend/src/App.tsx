import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './components/protecteRoutes/ProtectedRoutes';
import Sidebar from './components/layout/Sidebar';
import ActiveHabits from './pages/ActiveHabits';
import PublicRoutes from './components/protecteRoutes/PublicRoutes';

// good when you have a dashboard with sidebar this comp helps with it
const DashboardLayout = () => {

  const pathName: any = useLocation();
  const currentPath: string = pathName || "";

  const mainPadding = ["/dashbaord", "/habits"].includes(currentPath);
  let mainClass = [];
  if (mainPadding) mainClass.push("add-padding")

  return (
    <div className='app'>
      <div className='app--sidebar'>
        <Sidebar />
      </div>
      <main className={mainClass.join(" ")} >
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>

            <Route element={<ProtectedRoutes />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/habits" element={<ActiveHabits />} />
              </Route>
            </Route>
            {/* public routes, meaning every one can view and enter */}
            <Route element={<PublicRoutes />} >
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            
          </Routes>

        </AuthProvider>

      </Router>
    </>
  )
}

export default App
