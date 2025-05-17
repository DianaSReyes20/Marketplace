// src/components/TopBar.tsx
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';// o '@fontsource/poppins/400.css' para solo el peso normal

interface TopBarProps {
  username: string;
  companyName?: string;
}

const TopBar = ({ username, companyName = 'Marketplace Magic ♦' }: TopBarProps) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#6cabb9', color: '#333', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 2 }} color={'#ffffff'}> 
          {companyName}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <AccountCircleIcon />
          <Typography variant="subtitle1" color={'#ffffff'}>{username}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
