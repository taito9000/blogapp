import React from 'react';
import { Box, Container, Alert } from '@mui/material';
import Header from 'src/components/header';
import { useGetArticle } from 'src/hooks/useArticles';
import ArticleDetail from 'src/components/ArticleDetail';

const Detail = ({ articleId }: { articleId: string }) => {
  const { data, error, isLoading } = useGetArticle(articleId);
  return (
    <>
      <Header title='公開画面・記事詳細' loading={isLoading} />
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          py: 16,
        }}
      >
        <Container
          maxWidth='lg'
          sx={{
            bgcolor: '#ffffff',
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

          {data && <ArticleDetail article={data} />}
        </Container>
      </Box>
    </>
  );
};

export default Detail;
