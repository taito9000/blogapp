import React from 'react';
import { Box, Container, Button } from '@mui/material';
import Header from 'src/components/header';
import useAxiosInstance from 'src/hooks/useAxiosInstance';
import { useNavigate } from 'react-router-dom';
import { useMessage } from 'src/hooks/useMessage';
import { MessageSnackbar } from 'src/components/mui/snackBar';
import ArticleForm from 'src/components/ArticleForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { mutate } from 'swr';
import { ArticleFormData } from 'src/lib/interfaces';
import ArticleDetail from 'src/components/ArticleDetail';

const CreateArticle = () => {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const { message, setMessage } = useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ArticleFormData>({
    mode: 'onChange',
    defaultValues: { title: '', content: '' },
  });

  // フォーム送信時の処理
  const saveArticle: SubmitHandler<ArticleFormData> = async (formData) => {
    try {
      const response = await axiosInstance.post('/articles', formData);
      // SWRのキャッシュに新規記事を追加
      mutate('/articles', response.data, false);
      // 成功時に記事一覧に遷移
      navigate('/', {
        state: { text: '記事を作成しました', type: 'success' },
      });
    } catch (error) {
      setMessage({ text: '記事の作成に失敗しました', type: 'error' });
    }
  };

  // ライブプレビューのためにそれぞれの値を監視、更新
  const titleValue = watch('title');
  const contentValue = watch('content');

  return (
    <>
      <Header title='管理画面・記事作成' />
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

          <ArticleDetail
            article={{ title: titleValue, content: contentValue }}
            isPreview={true}
          />

          <form onSubmit={handleSubmit(saveArticle)}>
            <ArticleForm control={control} errors={errors} isValid={isValid} />
          </form>
        </Container>
      </Box>
    </>
  );
};

export default CreateArticle;
