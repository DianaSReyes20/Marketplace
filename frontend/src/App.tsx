// src/App.tsx o src/Routes.tsx
import PrivateRoute from './components/auth/PrivateRoute';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SellerDashboard from './pages/seller/SellerDashboard';
// import AdminPanel from './pages/admin/AdminPanel';

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} /> */}
      
      {/* Rutas protegidas para vendedores */}
      <Route element={<PrivateRoute allowedRoles={['seller']} />}>
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        {/* <Route path="/seller/products" element={<SellerProductsPage />} /> */}
      </Route>
      
      {/* Rutas protegidas para administradores */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
      </Route>
      
      {/* Ruta protegida para cualquier usuario autenticado */}
      <Route element={<PrivateRoute />}>
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;