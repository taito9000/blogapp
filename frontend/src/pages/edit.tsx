import React from 'react';
import { Box, Container, Alert } from '@mui/material';
import Header from 'src/components/header';
import useAxiosInstance from 'src/hooks/useAxiosInstance';
import { useNavigate } from 'react-router-dom';
import { useMessage } from 'src/hooks/useMessage';
import { MessageSnackbar } from 'src/components/mui/snackBar';
import { useSWRConfig } from 'swr';
import ArticleDetail from 'src/components/ArticleDetail';
import { useGetArticle } from 'src/hooks/useArticles';
import ArticleForm from 'src/components/ArticleForm';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  title: string;
  content: string;
}

const EditArticle = ({ articleId }: { articleId: string }) => {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { message, setMessage } = useMessage();
  const { data, error, isLoading } = useGetArticle(articleId);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: 'onChange',
    values: data,
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  // ライブプレビューのためにそれぞれの値を監視、更新
  const titleValue = watch('title');
  const contentValue = watch('content');

  const saveArticle: SubmitHandler<FormData> = async (formData) => {
    try {
      await axiosInstance.patch(`/articles/${articleId}`, formData);
      mutate(`/articles/${articleId}`, formData, false);
      navigate('/', {
        state: { text: '編集内容を保存しました', type: 'success' },
      });
    } catch (error) {
      setMessage({ text: '編集に失敗しました', type: 'error' });
    }
  };

  return (
    <>
      <Header title='管理画面・記事作成編集' loading={isLoading} />
      <Box sx={{ bgcolor: '#ffd6ad', minHeight: '100vh', py: 14 }}>
        <Container
          maxWidth='lg'
          sx={{
            bgcolor: 'rgb(208 208 208 /1)',
            py: 5,
            px: 10,
            borderRadius: '16px',
          }}
        >
          {message?.text && <MessageSnackbar message={message} />}
          {error && (
            <Alert severity='error' sx={{ mb: 4 }}>
              {error.message}
            </Alert>
          )}

          {data && (
            <>
              <ArticleDetail
                article={{ title: titleValue, content: contentValue }}
                isPreview={true}
              />
              <form onSubmit={handleSubmit(saveArticle)}>
                <ArticleForm
                  control={control}
                  errors={errors}
                  isValid={isValid}
                />
              </form>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default EditArticle;
