import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  LinearProgress,
  Button,
} from '@mui/material';
import { LinkButton } from 'src/components/mui/linkButton';
import HideOnScroll from 'src/components/hideOnScroll';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

// ヘッダーのコンポーネント
const Header: React.FC<{ title: string; loading?: boolean }> = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const logOut = useSignOut();

  const handleLogOut = () => {
    logOut();
    navigate('/login');
  };
  return (
    <HideOnScroll>
      <AppBar position='fixed' sx={{ backgroundColor: 'rgb(208 208 208/0.8)' }}>
        <Toolbar sx={{ height: 80 }}>
          <Typography
            variant='h4'
            component='div'
            sx={{ flexGrow: 1, textAlign: 'left' }}
          >
            {props.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {!isAuthenticated && (
              // 未ログインの場合表示
              <>
                <LinkButton buttonLink='/signup' buttonText='signup' />
                <LinkButton buttonLink='/login' buttonText='login' />
              </>
            )}
            {isAuthenticated && (
              // ログイン済の場合表示
              <Button variant='outlined' size='large' onClick={handleLogOut}>
                logout
              </Button>
            )}
          </Box>
        </Toolbar>
        {props.loading && <LinearProgress sx={{ color: 'primary.main' }} />}
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
