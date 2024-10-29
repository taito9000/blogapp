import React, { useEffect, useState } from 'react';
import { Box, Container, Pagination, Alert } from '@mui/material';
import Header from 'src/components/header';
import ArticleListItems from 'src/components/ArticleListItems';
import { useGetArticles } from 'src/hooks/useArticles';
import { MessageSnackbar } from 'src/components/mui/snackBar';
import { useLocation } from 'react-router-dom';
import { useMessage } from 'src/hooks/useMessage';
import { Message } from 'src/lib/interfaces';
import { useNavigate } from 'react-router-dom';

const itemsPerPage = 10;
const ArticleList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { message, setMessage } = useMessage();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetArticles(page, itemsPerPage);

  useEffect(() => {
    // stateが未指定の場合はnullが入っている
    const stateMessage: Message | null = location.state;
    if (stateMessage && stateMessage.text) {
      setMessage(stateMessage);
      // stateの初期化
      navigate(location.pathname, { replace: true, state: null });
    }
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header title='公開画面・記事一覧' loading={isLoading} />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 14 }}>
        {message && <MessageSnackbar message={message} />}
        <Container
          maxWidth='lg'
          sx={{
            bgcolor: 'rgb(208 208 208 /1)',
            py: 5,
            px: 10,
            borderRadius: '16px',
          }}
        >
          {error && (
            <Alert severity='error' sx={{ mb: 4 }}>
              {error.message}
            </Alert>
          )}

          {data && data.articles && (
            <ArticleListItems articles={data.articles} />
          )}

          {data && data.totalArticles !== 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.max(
                  1,
                  Math.ceil(data.totalArticles / itemsPerPage)
                )}
                page={page}
                onChange={handlePageChange}
                color='primary'
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};
export default ArticleList;
