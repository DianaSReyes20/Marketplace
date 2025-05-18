import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { useGetSellerProductsQuery } from '../../api/productsApi'; // Asegúrate de tenerlo definido
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface ProductListProps {
  reloadTrigger: unknown;
}

const ProductList: React.FC<ProductListProps> = ({ reloadTrigger }) => {
  // Selector para obtener el seller autenticado
  const user = useSelector((state: RootState) => state.auth.user);
  const sellerId = user ? user.id : undefined;

 // Hook de RTK Query para obtener los productos del seller
  const { data: products, refetch } = useGetSellerProductsQuery(sellerId!, {
    skip: !sellerId,
  });

  useEffect(() => {
    refetch(); // Se vuelve a cargar cuando cambia reloadTrigger
  }, [reloadTrigger, refetch]);

  return (
    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 3, boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell><Typography fontWeight={600}>Nombre</Typography></TableCell>
            <TableCell align="center"><Typography fontWeight={600}>Stock</Typography></TableCell>
            <TableCell align="center"><Typography fontWeight={600}>Precio</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <TableRow
              key={product.id}
              hover
              sx={{
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#f0f8ff',
                },
              }}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell align="center">{product.quantity}</TableCell>
              <TableCell align="center">${product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
