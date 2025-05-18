import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductFormModal from '../../features/products/ProductFormModal';
import ProductList from '../../features/products/ProductList';
import TopBar from '../../components/shared/TopBar';
import type { RootState } from '../../store/store'; // Adjust the path if your store file is elsewhere

const SellerDashboard = () => {
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false); // Para refrescar la lista
  const user = useSelector((state: RootState) => state.auth.user); // Acceder al usuario autenticado
  const username = user ? user.email : '';  // Nombre del usuario autenticado

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setReload(prev => !prev); // Refresca productos al cerrar
  };

  return (
    <>
      <TopBar username={username} />
      <Box px={4}>
        <h2> Inventario de Productos</h2>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Agregar Producto
        </Button>

        <ProductList reloadTrigger={reload} />

        <ProductFormModal open={open} onClose={handleClose} />
      </Box>
    </>
  );
};

export default SellerDashboard;
