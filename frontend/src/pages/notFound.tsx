import React from 'react';
import { Box, Typography } from '@mui/material';
import { LinkButton } from 'src/components/mui/linkButton';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        padding: '20px',
      }}
    >
      <Typography
        variant='h1'
        component='div'
        sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#333' }}
      >
        404
      </Typography>
      <Typography
        variant='h5'
        component='div'
        sx={{ margin: '20px 0', color: '#555' }}
      >
        お探しのページが見つかりませんでした
      </Typography>
      <Typography
        variant='body1'
        component='div'
        sx={{ marginBottom: '40px', color: '#777' }}
      >
        申し訳ありませんが、ページが存在しないか、削除された可能性があります。
      </Typography>

      <LinkButton buttonLink='/' buttonText='ホームに戻る' />
    </Box>
  );
};

export default NotFound;
