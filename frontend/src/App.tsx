import React from 'react';
import 'src/App.css';
import { Route, Routes } from 'react-router-dom';
import LogIn from 'src/pages/login';
import SignUp from 'src/pages/signup';
import ArticleList from 'src/pages/list';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Detail from 'src/pages/detail';
import NotFound from 'src/pages/notFound';
import { useParams } from 'react-router-dom';
import Edit from 'src/pages/edit';
import { useIsValidId, useIsPermitted } from 'src/hooks/useValidate';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import Create from 'src/pages/create';

const theme = createTheme({
  palette: {
    primary: { main: '#ef7a00' },
    background: { default: '#F5F5F5' },
    text: { primary: '#333333', secondary: '#666666' },
  },
  typography: {
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
});

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<ArticleList />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/detail/:id' element={<CheckAndReturnDetail />} />
          <Route element={<AuthOutlet fallbackPath='/not-found' />}>
            <Route path='/edit/:id' element={<CheckAndReturnEdit />} />
            <Route path='/create' element={<CheckAndReturnCreate />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

// TODO: より包括的なエラーハンドリングを行う
const CheckAndReturnDetail = (): JSX.Element => {
  const articleId = useParams<string>().id;
  const isValidId = useIsValidId(articleId!);
  if (!isValidId) return <NotFound />;

  return <Detail articleId={articleId!} />;
};

const CheckAndReturnEdit = (): JSX.Element => {
  const articleId = useParams<string>().id;
  const isValidId = useIsValidId(articleId!);
  const isPemitted = useIsPermitted('admin');
  if (!isValidId && !isPemitted) return <NotFound />;

  return <Edit articleId={articleId!} />;
};

const CheckAndReturnCreate = (): JSX.Element => {
  const isPemitted = useIsPermitted('admin');
  if (!isPemitted) return <NotFound />;

  return <Create />;
};

export default App;
