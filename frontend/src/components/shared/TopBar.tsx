import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';// o '@fontsource/poppins/400.css' para solo el peso normal
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'; // Ajusta la ruta a donde tengas tu slice
import { useNavigate } from 'react-router-dom';

// Props para recibir parámetros en la TopBar
interface TopBarProps {
  username: string;
  companyName?: string;
}

const TopBar = ({ username, companyName = 'Marketplace Magic ♦' }: TopBarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cerrar sesión y redirigir al usuario al 'home'
  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#6cabb9', color: '#333', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 2 }} color={'#ffffff'}> 
          {companyName}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <AccountCircleIcon />
          <Box onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }}>
            <Typography variant="subtitle1" color="#ffffff">
              {username}
            </Typography>
          </Box>

          {username !== 'Iniciar sesión' && (
            <IconButton onClick={handleLogout} color="inherit" size="small">
              <LogoutIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
