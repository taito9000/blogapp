import React from 'react';
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
import useAxiosInstance from 'src/hooks/useAxiosInstance';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from 'src/components/header';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useMessage } from 'src/hooks/useMessage';

export default function SignUp() {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const signIn = useSignIn();

  const { message, setMessage } = useMessage();
  const [showPassword, setShowPassword] = React.useState(false);

  const validateEmail = (email: string) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const validatePassword = (password: string) => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regexPassword.test(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = (data.get('email') as string).trim();
    const password = (data.get('password') as string).trim();
    const userName = (data.get('userName') as string).trim();

    // 記入欄バリデーション
    if (!email || !password || !userName) {
      setMessage({ text: '全ての欄を記入してください。', type: 'error' });
      return;
    }

    // メールアドレスバリデーション
    if (!validateEmail(email)) {
      setMessage({
        text: '有効なメールアドレスを入力してください。',
        type: 'error',
      });
      return;
    }

    // パスワードバリデーション
    if (!validatePassword(password)) {
      setMessage({
        text: 'パスワードは8文字以上で、少なくとも1つの大文字、1つの小文字、および1つの数字を含める必要があります。',
        type: 'error',
      });
      return;
    }

    try {
      // ユーザー登録処理
      await axiosInstance.post('auth/signup', {
        email,
        password,
        user_name: `${userName}`,
      });
      setMessage({ text: '登録に成功しました！', type: 'success' });

      // login状態にしてルートに遷移させる
      const response = await axiosInstance.post('auth/login', {
        email,
        password,
      });
      signIn({
        auth: { token: response.data.accessToken, type: 'Bearer' },
        userState: response.data.userData,
      });
      navigate('/');
    } catch (error) {
      // axios で発生したエラーかどうかを確認
      if (axios.isAxiosError(error) && error.response) {
        // メッセージがある場合は表示。メッセージがない場合、デフォルトで「サインアップに失敗しました」と表示
        setMessage({
          text: error.response.data.message || 'サインアップに失敗しました',
          type: 'error',
        });
      } else {
        // サーバーからのresponseがない場合、デフォルトで「予期しないエラーが発生しました」と表示
        setMessage({ text: '予期しないエラーが発生しました', type: 'error' });
      }
    }
  };

  // パスワードの表示/非表示を切り替える
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Header title='サインアップ' />
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
          サインアップ
        </Typography>
        {message && (
          <Alert severity={message.type} sx={{ width: '100%', mt: 2 }}>
            {message.text}
          </Alert>
        )}
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='given-name'
                name='userName'
                required
                fullWidth
                id='userName'
                label='ユーザー名'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='メールアドレス'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='パスワード'
                type={showPassword ? 'text' : 'password'} // パスワードの可視/不可視を切り替え
                id='password'
                autoComplete='new-password'
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
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            サインアップ
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                すでにアカウントをお持ちですか？ ログイン
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
