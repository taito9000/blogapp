import React from 'react';
import { Box, Button, Paper, Grid, Typography } from '@mui/material';
import { Control, FieldErrors } from 'react-hook-form';
import { ArticleFormField } from 'src/components/mui/articleFormField';
import { ArticleFormData } from 'src/lib/interfaces';

interface ArticleFormProps {
  control: Control<ArticleFormData>;
  errors: FieldErrors<ArticleFormData>;
  isValid: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  control,
  errors,
  isValid,
}) => {
  const maxTitleLength = 255;
  const maxContentLength = 3000;

  return (
    <Paper sx={{ p: 3, my: 3 }}>
      <ArticleFormField
        label='タイトル'
        name='title'
        control={control}
        error={errors.title?.message}
        maxLength={maxTitleLength}
      />
      <ArticleFormField
        label='コンテンツ'
        name='content'
        control={control}
        error={errors.content?.message}
        maxLength={maxContentLength}
        multiline={8}
      />
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          Drag & Drop image
        </Typography>
        <input
          accept='image/*'
          style={{ display: 'none' }}
          id='image-upload'
          type='file'
        />
        <label htmlFor='image-upload'>
          <Button variant='outlined' component='span'>
            画像のアップロード
          </Button>
        </label>
      </Box>
      <Grid container spacing={2} justifyContent='space-between' sx={{ mt: 3 }}>
        <Grid item>
          <Button variant='outlined' size='large' href='/'>
            一覧に戻る
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            size='large'
            sx={{ color: 'white', fontWeight: 'bold' }}
            type='submit'
            disabled={!isValid}
          >
            保存
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ArticleForm;
