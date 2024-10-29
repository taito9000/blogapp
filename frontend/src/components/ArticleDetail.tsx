import { FC, useState } from 'react';
import { Article } from 'src/lib/interfaces';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { LinkButton } from 'src/components/mui/linkButton';
import { LinkIconButton } from 'src/components/mui/linkIconButton';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { authUserData } from 'src/lib/interfaces';
import { formatDate } from 'src/lib/utils';
import DeleteButton from 'src/components/mui/deleteButton';
import { useIsPermitted } from 'src/hooks/useValidate';

interface ArticleDetailProps {
  article: Partial<Article>;
  isPreview?: boolean;
}

const ArticleDetail: FC<ArticleDetailProps> = ({
  article,
  isPreview = false,
}) => {
  const authUserData: authUserData = useAuthUser();
  const [error, setError] = useState<string | null>(null);
  const isAdmin = useIsPermitted('admin');

  return (
    <>
      {error && (
        <Alert severity='error' sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Typography
        variant='h5'
        component='h1'
        gutterBottom
        sx={{ textAlign: 'left', fontWeight: 'bold' }}
      >
        {article.title}
      </Typography>
      <Card elevation={2}>
        <CardContent>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>
              {!isPreview && (
                <Typography variant='subtitle2' color='text.secondary'>
                  {isAdmin && <>{`ユーザーID : ${article.created_user}`}</>}
                  &nbsp;&nbsp;&nbsp;
                  {article.created_at && formatDate(article.created_at)}
                </Typography>
              )}
            </Grid>
            {isAdmin && (
              <Grid item>
                <Grid container spacing={1}>
                  {!isPreview && (
                    <>
                      <Grid item>
                        <LinkIconButton
                          buttonLink={`/edit/${article.id}`}
                          icon={<EditIcon />}
                          text='編集'
                        />
                      </Grid>
                      <Grid item>
                        {article.id && (
                          <DeleteButton
                            articleId={article.id}
                            authUserData={authUserData}
                            onError={setError}
                            icon={false}
                          />
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
          <Box
            sx={{
              my: 2,
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <CardMedia
              component='img'
              image={article.image_url || '/img/noimage.png'}
              alt='記事イメージ'
              sx={{
                maxWidth: '500px',
                height: 'auto',
                maxHeight: '375px',
                objectFit: 'fill',
              }}
            />
          </Box>
          <Typography
            variant='body1'
            paragraph
            sx={{
              color: 'text.primary',
              textAlign: 'left',
              whiteSpace: 'pre-wrap',
            }}
          >
            {article.content}
          </Typography>
        </CardContent>
      </Card>
      {!isPreview && (
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <LinkButton buttonLink='/' buttonText='一覧に戻る' />
        </Box>
      )}
    </>
  );
};

export default ArticleDetail;
