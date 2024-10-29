import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAxiosInstance from 'src/hooks/useAxiosInstance';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Header from 'src/components/header';
import { useNavigate } from 'react-router-dom';
import { useMessage } from 'src/hooks/useMessage';

export default function LogIn() {
  const axiosInstance = useAxiosInstance();
  const { message, setMessage } = useMessage();
  const [showPassword, setShowPassword] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();

  // ログイン処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString().trim();
    const password = data.get('password')?.toString().trim();

    if (!email || !password) {
      setMessage({
        text: 'メールアドレスとパスワードを入力してください。',
        type: 'error',
      });
      return;
    }

    try {
      const response = await axiosInstance.post('auth/login', {
        email,
        password,
      });

      signIn({
        auth: { token: response.data.accessToken, type: 'Bearer' },
        userState: response.data.userData,
      });
      setMessage({ text: 'ログインに成功しました！', type: 'success' });
      navigate('/');
    } catch {
      setMessage({
        text: 'ログインに失敗しました。メールアドレスとパスワードを確認してください。',
        type: 'error',
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Header title='ログイン' />
      <Box
        sx={{
          marginTop: 8,
          py: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          ログイン
        </Typography>
        {message && ( // ログイン結果とバリデーションの表示
          <Alert severity={message.type} sx={{ width: '100%', mt: 2 }}>
            {message.text}
          </Alert>
        )}
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='メールアドレス'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='パスワード'
            type={showPassword ? 'text' : 'password'}
            id='password'
            autoComplete='current-password'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='パスワードの表示/非表示を切り替え'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/signup' variant='body2' sx={{ cursor: 'pointer' }}>
                アカウントをお持ちでない方はこちら
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
