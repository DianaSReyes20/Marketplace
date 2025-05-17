import { useGetAllProductsQuery } from '../../api/productsApi';
import { useGetAllSellersQuery } from '../../api/authApi';
import TopBar from '../../components/shared/TopBar';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Card, CardContent, CardMedia, Typography, FormControl, MenuItem, InputLabel, Select } from '@mui/material';

const AdminProductsPage = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const { data: sellers = [] } = useGetAllSellersQuery(); // Lista de vendedores
  const [sellerFilter, setSellerFilter] = useState('');
  const user = { name: 'John Doe' };

  const filteredProducts = sellerFilter
    ? products?.filter(p => p.userId === parseInt(sellerFilter))
    : products;

  return (
    <>
      <TopBar username={user.name} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <h2>Productos</h2>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Filtrar por vendedor</InputLabel>
          <Select
            value={sellerFilter}
            label="Filtrar por vendedor"
            onChange={(e) => setSellerFilter(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {sellers.map(seller => (
              <MenuItem key={seller.id} value={seller.id}>
                {seller.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <Grid container spacing={2} sx={{ py: 4 }}>
            {(filteredProducts ?? []).map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    //image={product.image || '/placeholder.jpg'}
                    image='/samsung-a55.jpg'
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2">{product.sku}</Typography>
                    <Typography variant="subtitle1" color="primary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          )}
      </Container>
    </>
  );
};

export default AdminProductsPage;
