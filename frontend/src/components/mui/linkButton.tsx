import React from 'react';
import { Button, SxProps } from '@mui/material';
import { Link } from 'react-router-dom';

export const LinkButton = ({
  buttonLink,
  buttonText,
  sx,
}: {
  buttonLink: string;
  buttonText: string;
  sx?: SxProps;
}) => {
  return (
    <Button
      variant='contained'
      size='large'
      component={Link}
      to={buttonLink}
      sx={{
        color: 'white',
        fontWeight: 'bold',
        height: 'auto',
        ...sx,
      }}
    >
      {buttonText}
    </Button>
  );
};
