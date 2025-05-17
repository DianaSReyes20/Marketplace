import { useEffect } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { useGetSellerProductsQuery } from '../../api/productsApi'; // Asegúrate de tenerlo definido
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface ProductListProps {
  reloadTrigger: unknown;
}

const ProductList: React.FC<ProductListProps> = ({ reloadTrigger }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const sellerId = user ? user.id : undefined;

  const { data: products, refetch } = useGetSellerProductsQuery(sellerId!, {
    skip: !sellerId,
  });

  useEffect(() => {
    refetch(); // Se vuelve a cargar cuando cambia reloadTrigger
  }, [reloadTrigger, refetch]);

  return (
    <Box mt={4}>
      <List>
        {products?.map((product) => (
          <ListItem key={product.id} divider>
            <ListItemText
              primary={product.name}
              secondary={`Stock: ${product.quantity} - Precio: $${product.price}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProductList;
