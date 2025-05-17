import { Box, Typography, Stack, Button, Divider } from '@mui/material';
import TopBar from '../components/shared/TopBar';
import { useNavigate } from 'react-router-dom';

const categories = [
  { title: 'Portátiles', icon: '/products/laptops.png' },
  { title: 'Smartphones', icon: '/products/smartphones.jpg' },
  { title: 'Tablets', icon: '/products/tablets.png' },
];

export const CategoryItem = ({ icon, title }: { icon: string; title: string }) => (
  <Box textAlign="center">
    <img src={icon} alt={title} style={{ width: 80, height: 80 }} />
    <Typography variant="body1" mt={1}>{title}</Typography>
  </Box>
);

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
        <TopBar username={''} />
        <Box py={4} textAlign={'center'}>
            <Typography variant="h4" fontWeight="bold" mb={1}>
                Bienvenido a Marketplace Magic ♦
            </Typography>
            <Typography variant="body1" mb={4}>
                Encuentra en nuestra tienda oficial la mayor variedad de productos tecnológicos.
            </Typography>
        
            <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap">
                {categories.map((cat) => (
                <CategoryItem key={cat.title} icon={cat.icon} title={cat.title} />
                ))}
            </Stack>
            <Button variant="outlined" sx={{ mt: 4 }} onClick={() => navigate('/marketplace')}>Ver más</Button>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box mb={5} textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
            Crea tu producto
            </Typography>
            <Typography variant="body1">
            Organiza de manera profesional tu inventario
            </Typography>
            <Typography variant="body1" mb={2}>
            Inicia sesión para poder ver tu inventario
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} color="primary" onClick={() => navigate('/login')}>CREAR PRODUCTO</Button>
        </Box>
    </>
  );
};

export default HomePage;
