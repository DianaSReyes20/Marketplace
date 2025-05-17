import { useGetAllProductsQuery } from '../api/productsApi';
import TopBar from '../components/shared/TopBar';
import { useState, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  Slider,
  Button,
} from '@mui/material';

const Marketplace = () => {
  const { data: products, isLoading } = useGetAllProductsQuery();
  const user = { name: 'Sofia Reyes' };

  // Filtros de búsqueda
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };
  
  const clearFilters = () => {
    setSearch('');
    setPriceRange([0, 1000]);
  };

  // Filtro de productos usando useMemo para optimización
  const filteredProducts = useMemo(() => {
    return (products ?? []).filter((product) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.sku.toLowerCase().includes(searchText);

      const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
      const min = priceRange[0];
      const max = priceRange[1];


      const matchesPrice = price >= min && price <= max;

      return matchesSearch && matchesPrice;
    });
  }, [products, search, priceRange]);

  return (
    <>
      <TopBar username={user.name} />
      <Box px={4}>
        <h2>Productos de la tienda</h2>

        <Box display="flex" flexDirection="column" gap={2} mb={3} width="200px">
            <Box>
                <Typography gutterBottom>Precios</Typography>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    sx={{ width: 300 }}
                />
                <Box display="flex" justifyContent="space-between">
                <Typography>${priceRange[0]}</Typography>
                <Typography>${priceRange[1]}</Typography>
                </Box>
            </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={2} mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Filtros</Typography>
                <Button onClick={clearFilters} color="error">Borrar</Button>
            </Box>

            <TextField
                label="Nombre o SKU"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
            />

            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <Grid container spacing={2}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image='/samsung-a55.jpg'
                        alt={product.name}
                      />
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body2">SKU: {product.sku}</Typography>
                        <Typography variant="subtitle1" color="primary">
                          ${product.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            </Box>
      </Box>
    </>
  );
};

export default Marketplace;
