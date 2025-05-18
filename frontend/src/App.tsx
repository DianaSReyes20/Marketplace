// src/App.tsx o src/Routes.tsx
import PrivateRoute from './components/shared/PrivateRoute';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterModal from './components/auth/RegisterModal';
import SellerDashboard from './pages/seller/SellerDashboard';
import AdminPage from './pages/admin/AdminPage';
import HomePage from './pages/HomePage';
import Marketplace from './pages/Marketplace';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Verificar si el usuario está en /register
  const isRegisterRoute = location.pathname === '/register';

  const handleCloseRegister = () => {
    navigate(-1); // o navigate('/') para volver al home
  };

  return (
    <>
      {isRegisterRoute && (
        <RegisterModal open={true} onClose={handleCloseRegister} />
      )}

      <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/" element={<HomePage />} />

      {/* Rutas protegidas para vendedores */}
      <Route element={<PrivateRoute allowedRoles={['seller']} />}>
        <Route path="/dashboard" element={<SellerDashboard />} />
      </Route>

      {/* Rutas protegidas para administrador */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;