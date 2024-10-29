import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Link,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { formatDate } from 'src/lib/utils';
import { Article } from 'src/lib/interfaces';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { authUserData } from 'src/lib/interfaces';
import { LinkButton } from './mui/linkButton';

// 記事一覧のブロックを表示するコンポーネント
const ArticleListItems: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const authUserData: authUserData = useAuthUser();

  return (
    <Grid container spacing={3}>
      {authUserData?.permissionName === 'admin' && (
        <LinkButton
          buttonLink='/create'
          buttonText='記事作成'
          sx={{ height: '55px', marginLeft: '12px', marginBottom: '10px' }}
        />
      )}
      {articles.map((article: Article) => (
        <Grid xs={12} key={article.id}>
          <Link
            href={`/detail/${article.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              ':hover': {
                textDecoration: 'none',
              },
            }}
          >
            <Card elevation={2}>
              <Grid container sx={{ height: 150 }}>
                <Grid xs={3}>
                  <CardMedia
                    component='img'
                    image={article.image_url || '/img/noimage.png'}
                    alt={article.title}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '150px',
                      objectFit: 'cover',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                </Grid>
                <Grid xs={9}>
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      padding: '8px 16px',
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant='h6'
                        sx={{
                          textAlign: 'left',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {article.title}
                      </Typography>
                      {authUserData?.permissionName === 'admin' && (
                        <Typography
                          textAlign={'left'}
                          variant='body2'
                          component='span'
                          sx={{ display: 'block' }}
                        >
                          {'ユーザーID : ' + article.created_user}
                        </Typography>
                      )}
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          textAlign: 'left',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {article.content}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        textAlign: 'right',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant='caption' color='text.secondary'>
                        <br />
                        {'更新日時：' + formatDate(article.updated_at)}
                      </Typography>
                      {authUserData?.permissionName === 'admin' && (
                        <Typography variant='caption' color='text.secondary'>
                          {'作成日時：' + formatDate(article.created_at)}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleListItems;
